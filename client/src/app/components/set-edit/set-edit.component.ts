import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SetActionsModalComponent } from '../set-actions-modal/set-actions-modal.component';
import { CardActionsModalComponent } from '../card-actions-modal/card-actions-modal.component';
import { CardSetService } from 'src/app/services/card-set.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-set-edit',
  templateUrl: './set-edit.component.html',
  styleUrls: ['./set-edit.component.css']
})
export class SetEditComponent implements OnInit, OnDestroy {

  setId!: number;

  title!: string;
  description!: string;
  cardCount!: number;

  isUserLoggedIn!: boolean;

  cards!: Card[];

  editSetFormGroup!: FormGroup;

  param$!: Subscription;

  constructor(private dialog: MatDialog, private cardSetSvc: CardSetService,
          private cardSvc: CardService, private router: Router,
          private fb: FormBuilder, private ar: ActivatedRoute,
          private authSvc: AuthService) {

    this.isUserLoggedIn = authSvc.isLoggedInValue;
  }

  ngOnInit(): void {
    this.param$ = this.ar.params.subscribe(
      (params) => {
        this.setId = params['setId'];
      }
    )

    this.cardSvc.getAllCardsFromSetById(this.setId)
      .then(result => {
        this.cards = result as Card[];
        this.cardSvc.cardsSharingObjValue = this.cards;
        this.cardCount = this.cards.length;
      }).catch(error => console.log(error));

    this.title = this.cardSetSvc.setSharingObjValue['title'];
    this.description = this.cardSetSvc.setSharingObjValue['description'];

    this.editSetFormGroup = this.fb.group({
      title: this.fb.control<string>(this.title, [Validators.required]),
      description: this.fb.control<string>(this.description)
    })

  }

  deleteSetDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;

    dialogConfig.data = {
      setAction: 'delete',
      setId: this.setId
    }

    this.dialog.open(SetActionsModalComponent, dialogConfig);
  }

  // TODO: what to do with result? - set cardset object again?
  // error go where?
  save() {
    console.log("save button clicked");
    this.cardSetSvc.setSharingObjValue['title'] = this.editSetFormGroup.value['title'];
    this.cardSetSvc.setSharingObjValue['description'] = this.editSetFormGroup.value['description'];

    this.cardSetSvc.updateCardSet(this.cardSetSvc.setSharingObjValue)
      .then(result => {
        console.log(result);
      }).catch(error => console.log(error));

    this.refreshComponent();
    this.router.navigate(['/set', this.setId]);
  }

  createCardDialog() {
    this.cardDialog('create');
  }

  editCardDialog(card: Card) {
    this.cardDialog('edit', card);
  }

  deleteCardDialog(card: Card) {
    this.cardDialog('delete', card);
  }

  cardDialog(action: string, card?: Card) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;

    dialogConfig.data = {
      cardAction: action
    }

    if (card) {
      dialogConfig.data['card'] = card;
    }
    
    this.dialog.open(CardActionsModalComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(result => {
      this.refreshComponent();
    });
  }

  refreshComponent() {
    this.cardSvc.getAllCardsFromSetById(this.setId)
      .then(result => {
        this.cards = result as Card[];
        this.cardSvc.cardsSharingObjValue = this.cards;
        this.cardCount = this.cards.length;
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
