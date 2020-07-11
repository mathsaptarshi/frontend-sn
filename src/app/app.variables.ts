import { Injectable } from '@angular/core';
import { AppConfigs } from './app.configs';

@Injectable()
export class AppVariables {
  constructor(private _appConfigs: AppConfigs) { }

  someErrorOccurred: string = 'Oops! Some error occured.';

  
}