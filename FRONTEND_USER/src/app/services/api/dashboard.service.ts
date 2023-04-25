import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { dashboardRouter } from 'src/app/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + dashboardRouter.getAll + environment.ALLOW_ANONYMOUS);
  }
  getRpMonth(year: string): Observable<any> {
    return this.http.get(environment.BASE_API_URL + dashboardRouter.getRpMonthYear + environment.ALLOW_ANONYMOUS + '&year=' + year);
  }
}
