import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppVariables } from '../../app.variables';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  public _userId: string = '';
  public userName: string = '';
  private _accessToken: string = '';
  public pageData: any = {};
  
  public postDetailsFormGroup: FormGroup = this.formBuilder.group({    
    'userPost': ['', [Validators.required]]
  });

  constructor(private _homeService: HomeService, public formBuilder: FormBuilder, private _router: Router, public appVariables: AppVariables) { }

  ngOnInit(): void {
    try {
      console.log(1);
      let userDetails = JSON.parse(localStorage.getItem("user_data"));
      this._userId = userDetails.user_id;
      this.userName = userDetails.user_name;
      this._accessToken = userDetails.access_token;
      this.getPageData();
    } catch (error) {
      console.log(2);
    }
  }

  getPageData(){
    // this._emitter.emit('showLoader');
    this._homeService.getPageData(this._userId, this._accessToken)
    .subscribe((resp) => {
      console.log(resp);
      this.pageData = resp;
      // if(resp.user_status == 401) {
      //   this._emitter.emit('logOutUser', {
      //     userId: this._userId,
      //     accessToken: this._accessToken
      //   });
      // }
      if(resp.status == 200) {
        this.pageData = resp;
      }
      else {
        // this._emitter.emit('hideLoader');
      }
    }, err => {
    });

  }

  postFormSubmit(){    

    let errValidation = false;
    // this.showVendorLoginRespMessage = false;
    // this.showErrorUserEmail = false;
    // this.showErroruserPassword = false;

    
      
    this._homeService.postData(this._userId, this._accessToken,this.postDetailsFormGroup.value)
      .subscribe((resp) => {
        console.log(resp);
        if (resp.status == 401) {
          this._router.navigateByUrl('/login');
        }
        else if (resp.status == 201) {
          // this.showErrorMessage = true;
          // this.message = this.appVariables.someErrorOccurred;
          // this.invalidReferenceCodeErrorMessage = '';
        }    
        else if (resp.status == 200) {
          this.getPageData();
          // window.localStorage.setItem('user_data', JSON.stringify(resp.data));
          // this._router.navigateByUrl('/dashboard');
          // this.showVendorLoginRespMessage = true;
          // this.message = this.appVariables.createsuccess;
          // this.loginFormGroup.reset();
        }
        else {
          //  this.showVendorLoginRespMessage = true;
          // this.message = this.appVariables.someErrorOccurred;
        }
      }, err => {
        console.log(err)
        // this._emitter.emit('hideLoader');
        if(err.status == 401) {
          this._router.navigateByUrl('/login');
        }
        else if(err.status == 400){
          // this._emitter.emit('showAlert', {
          //   type: 2,
          //   msg: err.error.message
          // });
        }
        else{
          // this.showMessage = true;
          // this.message = this.appVariables.someErrorOccurred;
          // this._emitter.emit('showAlert', {
          //   type: 2,
          //   msg: this.appVariables.someErrorOccurred
          // });
        }
      });
  }

  logOutUserFunc(){
    // this._emitter.emit('showLoader');
    this._homeService.logOutUser(this._userId, this._accessToken)
    .subscribe((resp) => {
      console.log(resp);
      window.localStorage.removeItem('user_data');
      this._userId = '';
      this.userName = '';
      this._router.navigateByUrl('/login'); 
      if(resp.status == 200) {
        this.pageData = resp;
      }
      else {
        // this._emitter.emit('hideLoader');
      }
    }, err => {
    });

  }

}
