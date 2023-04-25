import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { authenticationRouter, customerRouter } from 'src/app/utils';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  private isLoginSource = new BehaviorSubject((localStorage.getItem('user')) ? true : false);
  isLoginCurrent = this.isLoginSource.asObservable();
  changeLogin(isLogin: any) {
    this.isLoginSource.next(isLogin);
  }
  login(model: any): Observable<any> {
    return this.http.post(environment.BASE_API_URL + authenticationRouter.getToken, model);
  }
  register(model: any): Observable<any> {
    return this.http.post(environment.BASE_API_URL + customerRouter.register, model);
  }
}
