import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './portal/portal.component';
import { AuthGuard } from './auth/auth-guard';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';

const routes: Routes = [
  {
    path: 'portal',
    component: PortalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: '**',
    redirectTo: 'portal'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
