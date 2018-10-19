import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { PortalComponent } from './portal.component';
import { AuthGuard } from '../auth/auth-guard';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'portal',
        component: PortalComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'home', component: HomeComponent },
          { path: '**', redirectTo: 'home' }
        ]
      }
    ])
  ],
  declarations: [
    PortalComponent,
    HomeComponent
  ],
  providers: []
})
export class PortalModule { }
