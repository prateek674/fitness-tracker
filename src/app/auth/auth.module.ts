import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "angularfire2/auth";

import { MaterialModule } from "../material/material.module";
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
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        AngularFireAuthModule
    ],
    exports: []
})

export class AuthModule {}