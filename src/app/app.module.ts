import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JwksValidationHandler, OAuthModule, OAuthModuleConfig, OAuthStorage, ValidationHandler } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { PortalModule } from './portal/portal.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AuthModule,
    PortalModule,
    RouterModule.forRoot([
      { path: '**', redirectTo: 'portal' },
    ]),
  ],
  providers: [
    { provide: ValidationHandler, useClass: JwksValidationHandler },
    { provide: OAuthStorage, useValue: localStorage }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
