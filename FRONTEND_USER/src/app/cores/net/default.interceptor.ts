import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

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

/**
 * The default HTTP interceptor, see the registration details `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  private refreshTokenType: 're-request' | 'auth-refresh' = 'auth-refresh';
  private refreshToking = false;
  private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private requests: HttpRequest<any>[] = [];

  constructor(
    private injector: Injector,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    public messageService: NzNotificationService,
  ) {
    // if (this.refreshTokenType === 'auth-refresh') {
    //   this.buildAuthRefresh();
    // }
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase): void {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
      return;
    }

    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    // this.notification.error(`Request error ${ev.status}: ${ev.url}`, errortext);
    const mess = `Request error ${ev.status}: ${ev.url}` + errortext;
    this.messageService.error("","");
  }

  private toLogin(): void {
    const app = JSON.parse(localStorage.getItem('app') || '{}');
    if (app !== null && app !== undefined) {
      switch (app.type) {
        case 'HOME':
          this.goTo('/home');
          break;
        case 'QTHT':
          this.goTo('/passport/login');
          break;
        default:
          break;
      }
    }
    this.notification.error(`Chưa đăng nhập hoặc phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.`, ``);
  }

  private delayGotoLogin(): void {
    setTimeout(() => {
      // Clear token information
      this.toLogin();
    }, 3000);
  }

  private handleData(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Maybe because `throw` Export cannot be performed `HttpClient` of `end()` operating
    if (ev.status > 0) {
    }
    // this.checkStatus(ev);
    // Business processing: some common operations
    switch (ev.status) {
      case 200:
        break;
      case 401:
        break;
      case 403:
      case 404:
      case 500:
        break;
      default:
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
    // this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Unified plus server prefix
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.SERVER_URL + url;
    }
    let newReq = req.clone({ url });
    const token = '';
    if (this.tokenService.get()?.token && !url.endsWith('.json')) {
      newReq = newReq.clone({
        headers: newReq.headers.set('Authorization', 'Bearer ' + this.tokenService.get()?.token),
      });
    }

    // Loader icon
    this.requests.push(newReq);
    // this.loaderService.isLoading.next(true);

    return next.handle(newReq).pipe(
      mergeMap((ev) => {
        // Allow unified handling of request errors
        if (ev instanceof HttpResponseBase) {
          return this.handleData(ev, newReq, next);
        }
        // If everything is normal, follow up operations
        return of(ev);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next)),
      finalize(() => {
        this.removeRequest(newReq);
      }),
    );
  }
}
