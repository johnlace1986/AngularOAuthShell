import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';


@NgModule({
  declarations: [
    AppComponent,
    PortalComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AuthModule,
    RouterModule.forRoot([
      { path: 'portal', component: PortalComponent, canActivate: [AuthGuard] },
      { path: 'auth-callback', component: AuthCallbackComponent },
      { path: '**', redirectTo: 'portal' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
