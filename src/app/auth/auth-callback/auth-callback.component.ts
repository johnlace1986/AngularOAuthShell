import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this._authService.completeAuthentication()
      .then(() => {
        this._router.navigate(['protected']);
      });
  }
}
