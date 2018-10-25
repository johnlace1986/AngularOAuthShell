import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './auth/auth-guard';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';

const routes: Routes = [
  {
    path: '',
    children: [],
    canActivate: [AuthGuard]
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
