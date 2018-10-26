import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ])
  ],
  declarations: [    
    AuthCallbackComponent,
    LoginComponent
  ],
  providers: [AuthGuard, AuthService]
})
export class AuthModule { }
