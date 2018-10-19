import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticatedSubject$.asObservable();

  private _isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  public isDoneLoading$ = this._isDoneLoadingSubject$.asObservable();

  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest(
    this.isAuthenticated$,
    this.isDoneLoading$
  ).pipe(map(values => values.every(value => value)));

  private navigateToLoginPage() {
    this._router.navigate(['']);
  }

  constructor (private _oAuthService: OAuthService, private _router: Router) {
    this._oAuthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
    });

    window.addEventListener('storage', (event) => {
      if (event.key !== 'access_token' && event.key !== null) {
        return;
      }

      console.warn('Noticed changes to access_token (most likely from another tab), updating isAuthenticated');
      this._isAuthenticatedSubject$.next(this._oAuthService.hasValidAccessToken());

      if (!this._oAuthService.hasValidAccessToken()) {
        this.navigateToLoginPage();
      }
    });

    this._oAuthService.events
      .subscribe(_ => {
        this._isAuthenticatedSubject$.next(this._oAuthService.hasValidAccessToken());
      });

    this._oAuthService.events
      .pipe(filter(e => ['token_received'].includes(e.type)))
      .subscribe(e => this._oAuthService.loadUserProfile());

    this._oAuthService.events
      .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
      .subscribe(e => this.navigateToLoginPage());

    this._oAuthService.setupAutomaticSilentRefresh();
  }

  public runInitialLoginSequence(): Promise<void> {
    
    return this._oAuthService.loadDiscoveryDocument()
      .then(() => new Promise(resolve => resolve()))

      .then(() => this._oAuthService.tryLogin({ customHashFragment: location.hash }))

      .then(async () => {
        if (this._oAuthService.hasValidAccessToken()) {
          return Promise.resolve();
        }

        // Try to log in via silent refresh because the IdServer
        // might have a cookie to remember the user, so we can
        // prevent doing a redirect:
        try {
          await this._oAuthService.silentRefresh();
          return Promise.resolve();
        }
        catch (result) {
          const errorResponsesRequiringUserInteraction = [
            'interaction_required',
            'login_required',
            'account_selection_required',
            'consent_required',
          ];
          if (result && result.reason && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {
            // At this point we know for sure that we have to ask the
            // user to log in, so we redirect them to the IdServer to
            // enter credentials.
            //
            // Enable this to ALWAYS force a user to login.
            // this.oauthService.initImplicitFlow();
            //
            // Instead, we'll now do this:
            console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
            return Promise.resolve();
          }
          // We can't handle the truth, just pass on the problem to the next handler.
          return Promise.reject(result);
        }
      })

      .then(() => {
        this._isDoneLoadingSubject$.next(true);
      })
      .catch(() => {
        this._isDoneLoadingSubject$.next(true)
      });
  }

  public login(targetUrl?: string) {
    this._oAuthService.initImplicitFlow(encodeURIComponent(targetUrl || this._router.url));
  }

  public logout() { 
    this._oAuthService.logOut(); 
  }
  
  public hasValidToken() {
    return this._oAuthService.hasValidAccessToken();
  }
}
