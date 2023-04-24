import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CardSetService } from 'src/app/services/card-set.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-before-review-modal',
  templateUrl: './before-review-modal.component.html',
  styleUrls: ['./before-review-modal.component.css']
})
export class BeforeReviewModalComponent implements OnInit {

  setId!: number;
  cardsToReview!: Card[];

  constructor(private dialogRef: MatDialogRef<BeforeReviewModalComponent>,
              @Inject(MAT_DIALOG_DATA) data: any, private cardSvc: CardService,
              private router: Router, private cardSetSvc: CardSetService) {

    this.cardsToReview = data.cardsToReview;
    this.setId = data.setId;
  }

  ngOnInit(): void {
    
  }

  goToReview() {
    this.cardSvc.cardsToReviewSharingObjValue = this.cardsToReview;
    this.cardSetSvc.setSharingObjValue['id'] = this.setId;

    this.close();

    this.router.navigate(['/set',this.setId,'review']);
  }

  close() {
    this.dialogRef.close();
  }


}
