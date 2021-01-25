import { Subject }from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Injectable decorator is used when another service is used within a service
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private trainingService: TrainingService,
        private snackbar: MatSnackBar
    ) {}

    initAuthListener() {
        // subscribing to listen to any authentication status change
        this.afAuth.authState.subscribe(user => {
            if (user) {
                // authenticated
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                // user is null when unauthenticated - logout
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
        }).catch(error => {
            // console.log(error);
            // pop-up (snackbar) error display
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        });
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
        }).catch(error => {
            // console.log(error);
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}