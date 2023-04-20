import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  public canActivate(): Observable<boolean> {
    var token = localStorage.getItem('_token');
    if (token != null || token != undefined) {
      return of(true);
    }
    this.router.navigateByUrl('passport/login');
    return of(false);
  }
}
