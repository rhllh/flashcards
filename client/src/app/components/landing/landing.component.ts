import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SetActionsModalComponent } from '../set-actions-modal/set-actions-modal.component';
import { CardSetService } from 'src/app/services/card-set.service';
import { CardSet } from 'src/app/models/card-set.model';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';
import { getMessaging, onMessage } from 'firebase/messaging';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  cardSets!: CardSet[];

  isUserLoggedIn!: boolean;

  message: any = null;

  constructor(private dialog: MatDialog, private cardSetSvc: CardSetService,
            private authSvc: AuthService, private router: Router,
            private snackBar: MatSnackBar, private notifSvc: NotificationService) {
              
    this.isUserLoggedIn = this.authSvc.isLoggedInValue;
  }

  ngOnInit(): void {
    this.listen();
    this.cardSetSvc.getAllSetsForLanding(this.authSvc.sharingValue['id'])
      .then(result => {
        this.cardSets = result;
        this.snackBar.open(this.notifSvc.messageValue, 'Close', { duration: 1000 });
      }).catch(error => console.log(error));
  }

  openCreateDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;

    dialogConfig.data = {
      setAction: 'create'
    }

    this.dialog.open(SetActionsModalComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(result => {
      this.refreshComponent();
    })
  }

  viewSet(cardSet: CardSet) {
    this.cardSetSvc.setSharingObjValue = cardSet;
    this.router.navigateByUrl(`/set/${cardSet.id}`);
  }

  editSet(cardSet: CardSet) {
    this.cardSetSvc.setSharingObjValue = cardSet;
    this.router.navigateByUrl(`/set/${cardSet.id}/edit`);
  }

  logout() {
    console.log("log out");
    this.authSvc.isLoggedInValue = false;
    this.router.navigate(['/']);
  }

  refreshComponent() {
    this.cardSetSvc.getAllSetsForLanding(this.authSvc.sharingValue['id'])
      .then(result => {
        this.cardSets = result;
        console.log(this.cardSets);
      }).catch(error => console.log(error));
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log(payload);
      console.log('Message received. ', payload.data);
      this.message = payload.data as any;
      this.notifSvc.messageValue = this.message['gcm.notification.message'];
    });
  }
  
}
