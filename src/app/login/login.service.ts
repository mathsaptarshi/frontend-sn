import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigs } from '../app.configs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient, private _appConfigs:AppConfigs) { }

  userLogin(formData) {
    let fd = new FormData();
    fd.append("user_email", formData.userEmail);
    fd.append("user_password", formData.userPassword);

    return this._http.post(this._appConfigs.apiBaseUrl+'user-login', fd)
    .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  
}
