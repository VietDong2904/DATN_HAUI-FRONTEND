import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { baseAddressRouter, categoryRouter } from 'src/app/utils';
// RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseAddressService {
  constructor(private http: HttpClient) {}
  getCity(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + baseAddressRouter.city);
  }
  getDistrict(id: string): Observable<any> {
    return this.http.get(environment.BASE_API_URL + baseAddressRouter.district + id);
  }
  getCommune(id: string): Observable<any> {
    return this.http.get(environment.BASE_API_URL + baseAddressRouter.commune + id);
  }
}
