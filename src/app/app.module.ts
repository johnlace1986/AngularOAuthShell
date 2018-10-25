import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent
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
