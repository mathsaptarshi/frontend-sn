import { Injectable } from '@angular/core';
import { AppConfigs } from './app.configs';
import { map } from "rxjs/operators";
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable, of as ObservableOf, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _appConfigs: AppConfigs, private _router: Router) { }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    try {
      let userDetails = JSON.parse(localStorage.getItem("user_data")),
          userId = userDetails.user_id,
          accessToken = userDetails.access_token

      let fd = new FormData();

      fd.append("user_id", userId);
      fd.append("access_token", accessToken);
    
      // let headers = new HttpHeaders()
      // .set('Authorization', csrfToken);

      return this._http.post(this._appConfigs.apiBaseUrl + 'user-auth-check', fd)
      .pipe(map(res => {
        if(res['status'] == 200) {          
          return true;
        }
        else {
          this._router.navigateByUrl('/login');
          return false;
        }
      }, (err) => {
        this._router.navigateByUrl('/login');
        return false;
      }))
      .pipe(catchError((err: HttpErrorResponse): Observable<boolean> => {
        this._router.navigateByUrl('/login');
        return ObservableOf(false);
      }));
    } catch (error) {
      this._router.navigateByUrl('/login');
      return false;
    }
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    try {
      let userDetails = JSON.parse(localStorage.getItem("user_data")),      
          userId = userDetails.user_id,
          accessToken = userDetails.access_token,
          csrfToken = accessToken;
          
      let fd = new FormData();

      fd.append("user_id", userId);
      fd.append("access_token", accessToken);    
      // let headers = new HttpHeaders()
      // .set('Authorization', csrfToken);

      return this._http.post(this._appConfigs.apiBaseUrl + 'user-auth-check', fd)
      .pipe(map(res => {
        if(res['status'] == 200) {
          this._router.navigateByUrl('/dashboard');
          return false;
        }
        else {
          return true;
        }
      }, (err) => {
        return true;
      }))
      .pipe(catchError((err: HttpErrorResponse): Observable<boolean> => {
        return ObservableOf(true);
      }));
    } catch (error) {
      return true;
    }
  }
}


