import { Subject }from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

// Injectable decorator is used when another service is used within a service
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private trainingService: TrainingService,
        private uiService: UIService
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
        // set uiService true to indicate started loading
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            // set uiService false to indicate stopped loading
            this.uiService.loadingStateChanged.next(false);
        }).catch(error => {
            // console.log(error);
            // set uiService false to indicate stopped loading
            this.uiService.loadingStateChanged.next(false);
            // pop-up (snackbar) error display
            this.uiService.showSnackBar(error.message, null, 3000);
        });
    }

    login(authData: AuthData) {
        // set uiService true to indicate started loading
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            // set uiService false to indicate stopped loading
            this.uiService.loadingStateChanged.next(false);
        }).catch(error => {
            // console.log(error);
            // set uiService false to indicate stopped loading
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar(error.message, null, 3000);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}