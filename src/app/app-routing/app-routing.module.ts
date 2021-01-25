import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from '../welcome/welcome.component';
import { TrainingComponent } from '../training/training.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  // canActivate: AuthGuard allows to impl the route protection
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // don't have to mention this in app.module since we are just using this here
  providers: [AuthGuard]
})

export class AppRoutingModule { }
