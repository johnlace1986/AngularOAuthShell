import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule } from '@angular/router';

import { AuthModule } from './auth/auth.module'
import { AppComponent } from './app.component';
import { PortalModule } from './portal/portal.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AuthModule,
    PortalModule,
    RouterModule.forRoot([
      { path: '**', redirectTo: 'portal' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
