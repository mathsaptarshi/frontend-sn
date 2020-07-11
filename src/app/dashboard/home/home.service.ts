import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigs } from '../../app.configs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http: HttpClient, private _appConfigs:AppConfigs) { }

  // getPageData(userId,accessToken) {    
  //   let fd = new FormData();    
  //   fd.append("user_id", userId);
  //   fd.append("access_token", accessToken);   

  //   return this._http.post(this._appConfigs.apiBaseUrl+'post-listings-page-data', fd)
  //   .pipe(map(res => JSON.parse(JSON.stringify(res))));
  // }

  getPageData(userId,accessToken) {    
    let fd = new FormData();    
    // fd.append("user_id", userId);
    // fd.append("access_token", accessToken);   

    return this._http.get(this._appConfigs.apiBaseUrl+'get-data')
    .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }

  logOutUser(userId, accessToken) {
    let fd = new FormData();
    fd.append("user_id", userId);
    fd.append("access_token", accessToken);

    return this._http.post(this._appConfigs.apiBaseUrl + 'user-logout', fd)
    .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }

  postData(userId,accessToken,formData) {
    console.log(formData);
    let fd = new FormData();
    
  
    fd.append("user_id", userId);
    fd.append("access_token", accessToken);
    fd.append("post_data", formData.userPost);    

    return this._http.post(this._appConfigs.apiBaseUrl+'create-post', fd)
    .pipe(map(res => JSON.parse(JSON.stringify(res))));
  }

}
