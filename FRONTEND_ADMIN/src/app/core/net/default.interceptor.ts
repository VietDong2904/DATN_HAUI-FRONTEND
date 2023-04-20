import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, _HttpClient } from "@delon/theme";
import { environment } from "@env/environment";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, finalize, mergeMap } from "rxjs/operators";
import { LoaderService } from "src/app/services/core/loader.service";
import { MessageService } from "src/app/services/core/message.service";

const CODEMESSAGE: { [key: number]: string } = {
    200: '200 - Success',
    201: '201 - Success',
    202: '202 - Success',
    204: '204 - Xóa dữ liệu thành công',
    400: '400 - Error',
    401: '401 - Unauthorized',
    403: '403 - Forbidden Error',
    404: '404 - Not Found',
    406: '406 - Not Acceptable',
    410: '410 - Gone',
    422: '422 - Unprocessable Entity',
    500: '500 - Internal Server Error',
    502: '502 - Bad Gateway',
    503: '503 - Service Unavailable',
    504: '504 - Gateway Timeout',
};

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    private refreshTokenType: 're-request' | 'auth-refresh' = 'auth-refresh';
    private refreshToking = false;
    private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private requests: HttpRequest<any>[] = [];
    constructor(
        private injector: Injector,
        private settingsService: SettingsService,
        public loaderService: LoaderService,
        public messageService: MessageService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    ) { }
    private get notification(): NzNotificationService {
        return this.injector.get(NzNotificationService);
    }

    private get tokenSrv(): ITokenService {
        return this.injector.get(DA_SERVICE_TOKEN);
    }

    private get http(): _HttpClient {
        return this.injector.get(_HttpClient);
    }

    private goTo(url: string): void {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }

    private checkStatus(ev: HttpResponseBase): void {
        if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
            return;
        }

        const errortext = CODEMESSAGE[ev.status] || ev.statusText;
        const mess = `Request error ${ev.status}: ${ev.url}` + errortext;
        this.messageService.add(mess);
    }

    private toLogin(): void {
        this.goTo('/passport/login');
        this.notification.error(`Chưa đăng nhập hoặc phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.`, ``);
    }

    private delayGotoLogin(): void {
        setTimeout(() => {
            this.settingsService.setUser({});
            (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
            this.toLogin();
        }, 3000);
    }

    private handleData(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (ev.status > 0) {
            this.http.end();
        }
        switch (ev.status) {
            case 200:
                break;
            case 401:
                this.messageService.add(`Chưa đăng nhập hoặc phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.`);
                this.settingsService.setUser({});
                (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
                break;
            case 403:
            case 404:
            case 500:
                this.settingsService.setUser({});
                (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
                break;
            default:
                this.settingsService.setUser({});
                (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
                if (ev instanceof HttpErrorResponse) {
                    console.warn('Unknown error, mostly due to backend not supporting CORS or invalid configuration', ev);
                }
                break;
        }
        if (ev instanceof HttpErrorResponse) {
            return throwError(ev);
        } else {
            return of(ev);
        }
    }

    removeRequest(req: HttpRequest<any>): any {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = req.url;
        if (!url.startsWith('https://') && !url.startsWith('http://')) {
            url = environment.SERVER_URL + url;
        }
        let newReq = req.clone({ url });
        if (this.tokenService.get()?.token && !url.endsWith('.json') && !url.startsWith(environment.API_RATE_MONEY)) {
            newReq = newReq.clone({
                headers: newReq.headers.set('Authorization', 'Bearer ' + this.tokenService.get()?.token),
            });
        }

        this.requests.push(newReq);
        this.loaderService.isLoading.next(true);

        return next.handle(newReq).pipe(
            mergeMap((ev) => {
                if (ev instanceof HttpResponseBase) {
                    return this.handleData(ev, newReq, next);
                }
                return of(ev);
            }),
            catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next)),
            finalize(() => {
                this.removeRequest(newReq);
            }),
        );
    }
}