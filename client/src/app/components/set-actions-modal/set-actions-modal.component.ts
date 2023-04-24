import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CardSet } from 'src/app/models/card-set.model';
import { AuthService } from 'src/app/services/auth.service';
import { CardSetService } from 'src/app/services/card-set.service';

@Component({
  selector: 'app-set-actions-modal',
  templateUrl: './set-actions-modal.component.html',
  styleUrls: ['./set-actions-modal.component.css']
})
export class SetActionsModalComponent implements OnInit {

  setAction!: string;
  setId!: number;
  form!: FormGroup;
  set!: CardSet;

  constructor(private dialogRef: MatDialogRef<SetActionsModalComponent>,
              @Inject(MAT_DIALOG_DATA) data: any, private fb: FormBuilder,
              private cardSetSvc: CardSetService, private router: Router,
              private authSvc: AuthService, private snackBar: MatSnackBar) {

    this.setId = data.setId;
    this.setAction = data.setAction;
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control<string>('', Validators.required),
      description: this.fb.control<string>('', Validators.required)
    });
  }

  createSetForm() {
    this.set = this.form.value as CardSet;
    this.set.creatorId = this.authSvc.sharingValue['id'];

    this.cardSetSvc.postNewCardSet(this.set)
      .then(result => {
        console.log(result);
      }).catch(error => {
        console.log(error);
        this.snackBar.open('Error creating card set', 'Close', { duration: 1000 });
      });
      
    this.close();
  }

  delete() {
    this.cardSetSvc.deleteCardSet(this.setId)
      .then(result => {
        console.log(result);
        this.router.navigateByUrl('/landing');
      }).catch(error => {
        console.log(error);
        this.snackBar.open('Error deleting card set', 'Close', { duration: 1000 });
      });

    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
