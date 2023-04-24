import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardSetService } from 'src/app/services/card-set.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-after-review-modal',
  templateUrl: './after-review-modal.component.html',
  styleUrls: ['./after-review-modal.component.css']
})
export class AfterReviewModalComponent {

  setId!: number;
  score!: any;

  constructor(private dialogRef: MatDialogRef<AfterReviewModalComponent>,
              @Inject(MAT_DIALOG_DATA) data: any, private cardSvc: CardService,
              private router: Router, private cardSetSvc: CardSetService) {

    this.score = data.score;
    this.setId = data.setId;
  }

  backToSetMain() {

    // what happens if error?
    this.cardSetSvc.updateReviewScore(this.setId, this.score)
      .then(result => {
        console.log(result);
      }).catch(error => console.log(error));

    this.close();

    // TODO: do not route if isUpdated is false
    this.router.navigate(['/set', this.setId]);
  }

  sum(correct: any, wrong: any): number {
    return correct + wrong;
  }

  close() {
    this.dialogRef.close();
  }
}
