import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { QueryFilerModel } from '@model';
import { customerRouter } from '@util';
// RxJS
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: _HttpClient) {}
  private isChangeSource = new BehaviorSubject(false);
  isChangeCurrent = this.isChangeSource.asObservable();
  changeUser(isLogin: boolean) {
    this.isChangeSource.next(isLogin);
  }
  create(model: any): Observable<any> {
    return this.http.post(environment.BASE_API_URL + customerRouter.create, model);
  }

  update(model: any): Observable<any> {
    return this.http.put(environment.BASE_API_URL + customerRouter.update, model);
  }

  getById(id: string): Observable<any> {
    return this.http.get(environment.BASE_API_URL + customerRouter.getById + id);
  }

  delete(list: [string]): Observable<any> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: list,
    };
    return this.http.request('delete', environment.BASE_API_URL + customerRouter.delete, option);
  }
  getFilter(model: QueryFilerModel): Observable<any> {
    return this.http.post(environment.BASE_API_URL + customerRouter.getFilter, model);
  }
  changePassword(userUpdatePasswordModel: any): Observable<any> {
    return this.http.put(environment.BASE_API_URL + customerRouter.changePassword, userUpdatePasswordModel);
  }
}
