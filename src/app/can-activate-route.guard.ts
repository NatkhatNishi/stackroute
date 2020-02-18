import { RouterService } from './services/router.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

import { map } from 'rxjs/operators';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private routerService: RouterService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // ************* 1. with promise ****************

    return this.authService.isUserAuthenticated(this.authService.getBearerToken())
      .then(
        data => {
          console.log(data);
          if (!data) {
            this.routerService.routeToLogin();
          }
          return data;
        }
      );
  }

}
