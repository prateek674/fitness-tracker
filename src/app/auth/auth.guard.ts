import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

// Injectable decorator is used when another service is used within a service
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuth()) {
            return true;
        }
        else {
            // if not authenticated, redirect to login page
            this.router.navigate(['/login']);
        }
    }
    
    canLoad(route: Route) {
        if (this.authService.isAuth()) {
            return true;
        }
        else {
            // if not authenticated, redirect to login page
            this.router.navigate(['/login']);
        }
    }
}