import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppConfigs } from './app.configs';
import { EventEmitter } from 'events';
import { AppVariables } from './app.variables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,          
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [    
    EventEmitter,
    AppConfigs,
    AppVariables,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
