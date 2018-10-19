import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private _authService: AuthService) {
    this._authService.runInitialLoginSequence();
  }

  login() {
    console.log('login');
    this._authService.login(); 
  }

  public get hasValidToken() {
    return this._authService.hasValidToken();
  }
}
