import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    PortalComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
