import { AfterViewInit, Component, OnDestroy, OnInit, Query } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { CardSetService } from 'src/app/services/card-set.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BeforeReviewModalComponent } from '../before-review-modal/before-review-modal.component';

@Component({
  selector: 'app-set-main',
  templateUrl: './set-main.component.html',
  styleUrls: ['./set-main.component.css']
})
export class SetMainComponent implements OnInit, OnDestroy, AfterViewInit {

  setId!: number;
  title!: string;
  description!: string;
  userId!: number;
  cardCount!: number;

  isUserLoggedIn!: boolean;

  lastReview!: string;
  lastReviewScore!: number;

  cards!: Card[];
  cardsToReview!: Card[];

  numCardsToReview!: number;
  numCardsToReviewOpt: number[] = [];
  reviewFormGroup!: FormGroup;

  param$!: Subscription;

  constructor(private router: Router, private cardSvc: CardService,
              private authSvc: AuthService, private ar: ActivatedRoute,
              private cardSetSvc: CardSetService, private fb: FormBuilder,
              private dialog: MatDialog) {
                
    this.isUserLoggedIn = authSvc.isLoggedInValue;
  }
              
  ngOnInit(): void {
    this.userId = this.authSvc.sharingValue as number;
    this.param$ = this.ar.params.subscribe(
      (params) => {
        this.setId = params['setId'];
      }
    );

    this.title = this.cardSetSvc.setSharingObjValue['title'];
    this.description = this.cardSetSvc.setSharingObjValue['description'];
    this.lastReview = this.cardSetSvc.setSharingObjValue['lastReview'];
    this.lastReviewScore = this.cardSetSvc.setSharingObjValue['lastReviewScore'];

    this.cardSvc.getAllCardsFromSetById(this.setId)
      .then(result => {
        this.cards = result as Card[];
        this.cardSvc.cardsSharingObjValue = this.cards;
        this.cardCount = this.cards.length;
        this.generateOptions();
      }).catch(error => console.log(error));
    
    this.reviewFormGroup = this.fb.group({
      numCardsToReview: this.fb.control<number>(this.cardCount, [ Validators.required ]) 
    });
  }

  ngAfterViewInit(): void {
    this.refreshComponent();
  }

  generateOptions() {
    if (this.cardCount <= 5) {
      this.numCardsToReviewOpt.push(this.cardCount);
    } else {
    for (let i = 1; i < this.cardCount; i++) {
        if (i % 5 == 0) this.numCardsToReviewOpt.push(i);
      }
      this.numCardsToReviewOpt.push(this.cardCount);
    }
  }

  openStartReviewDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;

    this.numCardsToReview = this.reviewFormGroup.value['numCardsToReview'];
    
    this.cardsToReview = this.cards
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0,this.numCardsToReview);

    this.cardSvc.cardsToReviewSharingObjValue = this.cardsToReview;

    dialogConfig.data = {
      setId: this.setId,
      cardsToReview: this.cardsToReview
    }

    this.dialog.open(BeforeReviewModalComponent, dialogConfig);

  }

  refreshComponent() {
    this.cardSetSvc.getSetById(this.setId)
      .then(result => {
        this.cardSetSvc.setSharingObjValue = result;
        this.lastReview = this.cardSetSvc.setSharingObjValue['lastReview'];
        this.lastReviewScore = this.cardSetSvc.setSharingObjValue['lastReviewScore'];
      }).catch(error => console.log(error));
  }

  logout() {
    console.log("log out");
    this.authSvc.isLoggedInValue = false;
    this.authSvc.sharingValue = null;
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.param$.unsubscribe();
  }

  
}
