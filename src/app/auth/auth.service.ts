import { Subject }from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';

// Injectable decorator is used when another service is used within a service
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {}

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.authSuccessFully();
        }).catch(error => {
            console.log(error);
        });
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.authSuccessFully();
        }).catch(error => {
            console.log(error);
        });
    }

    logout() {
        this.trainingService.cancelSubscriptions();
        this.afAuth.auth.signOut();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccessFully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}