import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { QueryFilerModel } from '@model';
import { colorRouter } from '@util';
// RxJS
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ColorService {
    constructor(private http: _HttpClient) { }

    create(model: any): Observable<any> {
        return this.http.post(environment.BASE_API_URL + colorRouter.create, model);
    }

    createMany(model: any[]): Observable<any> {
        return this.http.post(environment.BASE_API_URL + colorRouter.createMany, model);
    }

    update(model: any): Observable<any> {
        return this.http.put(environment.BASE_API_URL + colorRouter.update, model);
    }

    getById(id: string): Observable<any> {
        return this.http.get(environment.BASE_API_URL + colorRouter.getById + id);
    }

    delete(list: [string]): Observable<any> {
        const option = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: list,
        };
        return this.http.request('delete', environment.BASE_API_URL + colorRouter.delete, option);
    }

    getFilter(model: QueryFilerModel): Observable<any> {
        return this.http.post(environment.BASE_API_URL + colorRouter.getFilter, model);
    }

    getAll(): Observable<any> {
        return this.http.get(environment.BASE_API_URL + colorRouter.getAll, null);
    }

    getListCombobox(): Observable<any> {
        return this.http.get(environment.BASE_API_URL + colorRouter.getListCombobox);
    }
}