import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { LandingComponent } from './components/landing/landing.component';
import { SetMainComponent } from './components/set-main/set-main.component';
import { SetEditComponent } from './components/set-edit/set-edit.component';
import { SetReviewComponent } from './components/set-review/set-review.component';
import { CardActionsModalComponent } from './components/card-actions-modal/card-actions-modal.component';
import { SetActionsModalComponent } from './components/set-actions-modal/set-actions-modal.component';
import { MaterialModule } from './material.module';
import { BeforeReviewModalComponent } from './components/before-review-modal/before-review-modal.component';
import { AfterReviewModalComponent } from './components/after-review-modal/after-review-modal.component';

import { environment } from "../assets/environments/environment";
import { initializeApp } from "firebase/app";
import { AuthService } from './services/auth.service';
initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LandingComponent,
    SetMainComponent,
    SetEditComponent,
    SetReviewComponent,
    CardActionsModalComponent,
    SetActionsModalComponent,
    BeforeReviewModalComponent,
    AfterReviewModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
