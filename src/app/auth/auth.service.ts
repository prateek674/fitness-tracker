import { Subject }from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };

        this.authChange.next(true);
    }

    logout(authData: AuthData) {
        this.user = null;
        this.authChange.next(false);
    }

    getUser() {
        // returning a copy of the user to avoid any changes made by others reflect on the original 
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }
}