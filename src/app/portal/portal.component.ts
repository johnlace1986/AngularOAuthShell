import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  claims: string;

  constructor(private _authService: AuthService) {
    this._authService.getClaims()
      .then(claims => {
        this.claims = JSON.stringify(claims);
      });
  }

  ngOnInit() {
  }

  logout() {
    this._authService.logout();
  }
}
