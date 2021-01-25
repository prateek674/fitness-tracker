import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from '../welcome/welcome.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  // loadChildren used for lazy loading; omit .ts extension
  // canLoad ensures training load only after successful auth
  { path: 'training', loadChildren: '../training/training-module#TrainingModule', canLoad: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // don't have to mention this in app.module since we are just using this here
  providers: [AuthGuard]
})

export class AppRoutingModule { }
