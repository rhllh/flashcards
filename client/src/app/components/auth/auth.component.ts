import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getMessaging, onMessage } from 'firebase/messaging';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  hide = true;

  formToShow: any = 'login';

  loginFormGroup!: FormGroup;
  signupFormGroup!: FormGroup;
  
  user!: User;

  isValidUser!: boolean;
  isUserCreated!: boolean;
  isUserLoggedIn!: boolean;

  message: any = null;

  constructor(private authSvc: AuthService, private fb: FormBuilder,
              private router: Router, private notifSvc: NotificationService,
              private snackBar: MatSnackBar) {

    this.isUserLoggedIn = this.authSvc.isLoggedInValue;
  }

  ngOnInit(): void {
    this.listen();
    this.loginFormGroup = this.createLoginForm();
    this.signupFormGroup = this.createSignupForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required])
    })
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      username: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)])
    })
  }

  login() {
    this.listen();
    this.user = this.loginFormGroup.value as User;
    this.authSvc.validateUser(this.user)
      .then(result => {
        this.isValidUser = result['isValidated'];
        if (this.isValidUser) {
          this.user.id = result['id'];
          this.authSvc.sharingValue = this.user;
          this.authSvc.isLoggedInValue = this.isValidUser;
          this.router.navigate(['/landing']);
        }
      }).catch(error => {
        this.snackBar.open(this.message['gcm.notification.message'], 'Close', { duration: 1000 });
        this.authSvc.isLoggedInValue = false;
        this.ngOnInit();
      });
  }

  signup() {
    this.listen();
    this.user = this.signupFormGroup.value as User;
    this.authSvc.createUser(this.user)
      .then(result => {
        this.isUserCreated = result['isCreated'];
        this.snackBar.open(this.message['gcm.notification.message'], 'Close', { duration: 1000 });
        this.ngOnInit();
      }).catch(error => {
        this.snackBar.open(this.message['gcm.notification.message'], 'Close', { duration: 1000 });
        this.ngOnInit();
      })
  }

  logout() {
    this.authSvc.isLoggedInValue = false;
    this.authSvc.sharingValue = null;
    this.ngOnInit();
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this.message = payload.data as any;
      console.log(this.message);
      this.notifSvc.messageValue = this.message['gcm.notification.message'];
    });
  }
  
}
