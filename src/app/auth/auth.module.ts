import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthConfig } from 'angular-oauth2-oidc';

import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';
import { CustomAuthConfig } from './custom-auth-config';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: AuthConfig, useValue: CustomAuthConfig },
    AuthService,
    AuthGuard
  ]
})
export class AuthModule { }
