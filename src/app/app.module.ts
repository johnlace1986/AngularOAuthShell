import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule } from '@angular/router';

import { AuthModule } from './auth/auth.module'
import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';;
import { AuthGuard } from './auth/auth-guard';


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
      { path: '**', redirectTo: 'portal' }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
