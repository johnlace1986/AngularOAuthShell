import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'auth-callback', component: AuthCallbackComponent }
    ])
  ],
  declarations: [    
    AuthCallbackComponent,
    LoginComponent
  ],
  providers: [AuthGuard, AuthService]
})
export class AuthModule { }
