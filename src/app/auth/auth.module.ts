import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "angularfire2/auth";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing-module";

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

/*
    These act as individual modules. Adding imports in app.module won't suffice. 
    Need to add them here.
*/

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        AuthRoutingModule
    ],
    exports: []
})

export class AuthModule {}