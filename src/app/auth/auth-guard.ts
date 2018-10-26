import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service'
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private _authService: AuthService, private _router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    let isLoggedIn = this._authService.isLoggedIn();
    console.log(isLoggedIn);


      if(isLoggedIn) {
        return true;
      }

      this._router.navigate(['login']);
      return false;
  }
}
