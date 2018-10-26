import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service'
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private _authService: AuthService, private _router: Router) { }
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    let isLoggedIn = await this._authService.isLoggedIn();

    if(isLoggedIn) {
      return true;
    }

    this._router.navigate(['login']);
    return false;
  }
}
