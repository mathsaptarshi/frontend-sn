import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService as AuthGaurd } from './auth.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  // { path: 'index', component: HomeComponent },
  { path: 'login' , component:LoginComponent },
  { path: 'user-registration' , component:RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivateChild: [AuthGaurd],
    children: [{
      path: '',
      pathMatch: 'full',
      redirectTo: '/dashboard/home'
      
    },
     {
      path: 'home',
      component: HomeComponent
    },
    // {
    //   path:'security-settings',
    //   component: SecuritySettingsComponent
    // },
    // {
    //   path:'invitation',
    //   component: InvitationListingComponent
    // }
    ],
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
