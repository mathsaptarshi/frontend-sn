import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppVariables } from '../app.variables';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registrationFormGroup: FormGroup = this.formBuilder.group({    
    'userName': ['', [Validators.required, Validators.pattern(/^[^-\s][A-Za-z ]+$/)]],
    'userEmail': ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
    'phoneNumber': ['', [Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}/)]],
    'password': ['', [Validators.required]]
  });

  constructor(private _registerService: RegisterService, public formBuilder: FormBuilder, private _router: Router, public appVariables: AppVariables) { }

  ngOnInit(): void {
  }

  loginFormSubmit(){    

    let errValidation = false;
    // this.showVendorLoginRespMessage = false;
    // this.showErrorUserEmail = false;
    // this.showErroruserPassword = false;

    // if(!this.loginFormGroup.controls['userEmail'].valid || this.loginFormGroup.value.userEmail == '') {
    //   this.showErrorUserEmail = true;
    //   errValidation = true;
    // }
    // else{
    //   this.showErrorUserEmail = false;      
    // }
    
    // if(!this.loginFormGroup.controls['userPassword'].valid || this.loginFormGroup.value.userPassword == '') {
    //   this.showErroruserPassword = true;
    //     errValidation = true;
    // }
    // else{
    //   this.showErroruserPassword = false;      
    // }

    // if(!!errValidation) {
    //   setTimeout(() => {
    //     $('html, body').animate({'scrollTop': $('.form-group small.text-danger').eq(0).offset().top - 300}, 300);
    //   }, 20);
    //   return false;
    // }
      
    this._registerService.userRegistration(this.registrationFormGroup.value)
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
          window.localStorage.setItem('user_data', JSON.stringify(resp.data));
          this._router.navigateByUrl('/dashboard');
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
}
