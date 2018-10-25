import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service'
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(private authService: AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    let isLoggedIn = this.authService.isLoggedIn();
    console.log(isLoggedIn);


      if(isLoggedIn) {
        return true;
      }

      this.authService.startAuthentication();
      return false;
  }
}
