import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { moneyRouter } from '@util';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BaseService {
    constructor(private http: HttpClient) { }
    getRate(): Observable<any> {
        return this.http.get(
            'http://openexchangerates.org/api/latest.json ' + environment.ALLOW_ANONYMOUS + '&app_id=' + environment.APP_RATE_ID,
        );
    }
}