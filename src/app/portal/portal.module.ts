import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PortalComponent } from './portal.component';
import { AuthGuard } from '../auth/auth-guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'portal', component: PortalComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
    PortalComponent
  ]
})
export class PortalModule { }
