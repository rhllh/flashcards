import { Component } from '@angular/core';
import { environment } from "../assets/environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'FLASHCARDS';

  message:any = null;

  constructor(private notifSvc: NotificationService) {}

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
            this.notifSvc.tokenValue = currentToken;
         } else {
            console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
}
