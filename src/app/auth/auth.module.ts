import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [    
    AuthCallbackComponent
  ],
  providers: [AuthGuard, AuthService]
})
export class AuthModule { }
