import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRoot from  './auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromRoot.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }

  canLoad(route: Route) {
    // Observable keeps sending new values even though this is called only once
    // so, sending only one value using pipe and take
    // takes only one value and closes this subscription here
    return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }
}
