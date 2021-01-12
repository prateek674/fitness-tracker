import { Subject }from 'rxjs';
import { Injectable } from '@angular/core';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();

    constructor(private router: Router) {}

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessFully();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessFully();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        // returning a copy of the user to avoid any changes made by others reflect on the original 
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }

    authSuccessFully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}