import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, CanLoad, UrlSegment, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._chechAthState(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }


  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const url = segments.map(s => `/${s}`).join('');

    /** take = 1 é para ouvir o valor apenas 1 vez e completar p serviço*/
    return this._chechAthState(url).pipe(take(1));
  }

  private _chechAthState(redirect: string): Observable<boolean> {
    return this._authService.isAuthenticated.pipe(
      tap(is => {
        if (!is) {
          /**
           * @queryParams guarda a url para que o usuário seja direcionando apos logar
           * @exemple /login?redirect=/tasks/create
           */
          this._router.navigate(['/login'], {
            queryParams: { redirect }
          });
        }
      }
      ));
  }
}
