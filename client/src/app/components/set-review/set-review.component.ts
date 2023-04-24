import { AfterViewInit, Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, query } from '@angular/animations';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/services/card.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardSetService } from 'src/app/services/card-set.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AfterReviewModalComponent } from '../after-review-modal/after-review-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-set-review',
  templateUrl: './set-review.component.html',
  styleUrls: ['./set-review.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class SetReviewComponent implements OnInit, AfterViewInit {

  setId!: number;

  isUserLoggedIn!: boolean;

  flip: string = 'inactive';

  cardsToReview!: Card[];

  score = { correct: 0, wrong: 0 };

  constructor(private cardSvc: CardService, private snackBar: MatSnackBar,
              private router: Router, private cardSetSvc: CardSetService,
              private dialog: MatDialog, private authSvc: AuthService) {

    this.isUserLoggedIn = authSvc.isLoggedInValue;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log("timeout")
      this.toggleFlip();
    }, 5000);
  }

  ngOnInit(): void {
    this.cardsToReview = this.cardSvc.cardsToReviewSharingObjValue;
    this.setId = this.cardSetSvc.setSharingObjValue['id'];
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  correct(i: number) {
    this.score["correct"] += 1;
    this.snackBar.open('Correct!', 'Close', { duration: 1000 });

    if (i != this.cardsToReview.length-1) {
      this.flip = 'inactive';
      this.ngAfterViewInit();
    }
  }

  incorrect(i: number) {
    this.score["wrong"] += 1;
    this.snackBar.open('Incorrect!', 'Close', { duration: 1000 });

    if (i != this.cardsToReview.length-1) {
      this.flip = 'inactive';
      this.ngAfterViewInit();
    }
  }

  openEndReviewDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;

    dialogConfig.data = {
      setId: this.setId,
      score: this.score
    }

    this.dialog.open(AfterReviewModalComponent, dialogConfig);

  }

  logout() {
    console.log("log out");
    this.authSvc.isLoggedInValue = false;
    this.authSvc.sharingValue = null;
    this.router.navigate(['']);
  }

}
