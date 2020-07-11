import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigs } from '../app.configs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient, private _appConfigs:AppConfigs) { }

  userRegistration(formData) {
    console.log(formData);
    let fd = new FormData();
    
    fd.append("user_full_name", formData.userName);
    fd.append("user_email", formData.userEmail);
    fd.append("user_password", formData.password);    
    fd.append("contact_number", formData.phoneNumber);    

    return this._http.post(this._appConfigs.apiBaseUrl+'user-registration', fd)
    .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }

}
