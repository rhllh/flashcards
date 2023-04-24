import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LandingComponent } from './components/landing/landing.component';
import { SetEditComponent } from './components/set-edit/set-edit.component';
import { SetMainComponent } from './components/set-main/set-main.component';
import { SetReviewComponent } from './components/set-review/set-review.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'set/:setId', component: SetMainComponent },
  { path: 'set/:setId/edit', component: SetEditComponent },
  { path: 'set/:setId/review', component: SetReviewComponent },
  { path: 'error', component: LandingComponent },
  { path: '**', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
