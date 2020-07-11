import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigs {
  // // Local Dev Server
  // apiBaseUrl: string = 'http://localhost:3000/';
  // baseUrl: string = 'http://localhost:3000/';  
  
  // AWS Dev Server
  apiBaseUrl: string = 'http://ec2-52-66-5-11.ap-south-1.compute.amazonaws.com:3000/';
  baseUrl: string = 'http://ec2-52-66-5-11.ap-south-1.compute.amazonaws.com:3000/';
  
}