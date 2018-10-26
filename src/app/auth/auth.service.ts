import { Injectable } from '@angular/core';

import { UserManager, User, UserManagerSettings } from 'oidc-client';

@Injectable()
export class AuthService {
  private _manager: UserManager = new UserManager(getClientSettings());
  private _user: User = null;

  constructor() {
  }

  private async loadUser(): Promise<void> {
    if (this._user === null) {
      const user = await this._manager.getUser();
      this._user = user;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    await this.loadUser();
    return this._user != null && !this._user.expired;    
  }

  async getClaims(): Promise<any> {
    await this.loadUser();
    return this._user.profile;
  }

  async getAuthorizationHeaderValue(): Promise<string> {
    await this.loadUser();
    return `${this._user.token_type} ${this._user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this._manager.signinRedirect();
  }

  async completeAuthentication(): Promise<void> {
    const user = await this._manager.signinRedirectCallback();
    this._user = user;
  }

  logout(): Promise<void> {
    return this._manager.signoutRedirect();
  }
}


export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://sso.local.galadirectory.co.uk/identity',
    client_id: 'data-sync-management-client',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: "id_token token",
    scope: "openid profile roles email data-sync-management-api",
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  };
}
