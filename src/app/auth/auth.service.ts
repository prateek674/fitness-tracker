import { User } from './user.model';
import { AuthData } from './auth-data.model';

export class AuthService {
    private user: User;

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
    }

    logout(authData: AuthData) {
        this.user = null;
    }

    getUser() {
        // returning a copy of the user to avoid any changes made by others reflect on the original 
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }
}