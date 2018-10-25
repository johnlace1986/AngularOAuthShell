import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './auth/auth-guard';
import { AuthService } from './auth/auth.service';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';


@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent,
    AuthCallbackComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
