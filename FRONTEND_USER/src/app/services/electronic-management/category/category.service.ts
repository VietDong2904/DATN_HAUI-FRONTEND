import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { categoryRouter } from 'src/app/utils';
// RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post(environment.BASE_API_URL + categoryRouter.create, model);
  }
  update(model: any): Observable<any> {
    return this.http.put(environment.BASE_API_URL + categoryRouter.update, model);
  }
  getById(id: string): Observable<any> {
    return this.http.get(environment.BASE_API_URL + categoryRouter.getById + id);
  }
  delete(list: [string]): Observable<any> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: list,
    };
    return this.http.request('delete', environment.BASE_API_URL + categoryRouter.delete, option);
  }
  getFilter(model: any): Observable<any> {
    return this.http.post(environment.BASE_API_URL + categoryRouter.getFilter, model);
  }
  getListCombobox(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + categoryRouter.getListCombobox + environment.ALLOW_ANONYMOUS);
  }
}
