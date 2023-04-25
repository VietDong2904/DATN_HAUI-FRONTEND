import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { productReviewRouter } from 'src/app/utils';
// RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  constructor(private http: HttpClient) {}

  create(model: any): Observable<any> {
    return this.http.post(environment.BASE_API_URL + productReviewRouter.create, model);
  }

  createMany(model: any[]): Observable<any> {
    return this.http.post(environment.BASE_API_URL + productReviewRouter.createMany, model);
  }

  update(model: any): Observable<any> {
    return this.http.put(environment.BASE_API_URL + productReviewRouter.update, model);
  }

  getById(id: string): Observable<any> {
    return this.http.get(environment.BASE_API_URL + productReviewRouter.getById + id + '&_allow_anonymous=true');
  }

  delete(list: [string]): Observable<any> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: list,
    };
    return this.http.request('delete', environment.BASE_API_URL + productReviewRouter.delete, option);
  }

  getFilter(model: any): Observable<any> {
    return this.http.post(environment.BASE_API_URL + productReviewRouter.getFilter, model);
  }

  getAll(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + productReviewRouter.getAll);
  }

  getListCombobox(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + productReviewRouter.getListCombobox);
  }
}
