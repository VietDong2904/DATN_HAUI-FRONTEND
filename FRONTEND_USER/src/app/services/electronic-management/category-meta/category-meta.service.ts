import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { categoryMetaRouter } from 'src/app/utils';
// RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryMetaService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post(environment.BASE_API_URL + categoryMetaRouter.create, model);
  }

  createMany(model: any[]): Observable<any> {
    return this.http.post(environment.BASE_API_URL + categoryMetaRouter.createMany, model);
  }

  update(model: any): Observable<any> {
    return this.http.put(environment.BASE_API_URL + categoryMetaRouter.update, model);
  }

  getById(id: string): Observable<any> {
    return this.http.get(environment.BASE_API_URL + categoryMetaRouter.getById + id);
  }

  delete(list: [string]): Observable<any> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: list,
    };
    return this.http.request('delete', environment.BASE_API_URL + categoryMetaRouter.delete, option);
  }

  getFilter(model: any): Observable<any> {
    return this.http.post(environment.BASE_API_URL + categoryMetaRouter.getFilter, model);
  }

  getAll(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + categoryMetaRouter.getAll + environment.ALLOW_ANONYMOUS);
  }

  getListCombobox(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + categoryMetaRouter.getListCombobox);
  }
}
