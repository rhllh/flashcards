import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { CardSetService } from 'src/app/services/card-set.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-actions-modal',
  templateUrl: './card-actions-modal.component.html',
  styleUrls: ['./card-actions-modal.component.css']
})
export class CardActionsModalComponent implements OnInit {

  cardAction: string;
  
  createFormGroup!: FormGroup;
  cardToCreate!: Card;
  createdCard!: Card;

  editFormGroup!: FormGroup;
  cardToEditOrDelete!: Card;

  @ViewChild('imageFile')
  imageFile!: ElementRef;

  constructor(private dialogRef: MatDialogRef<CardActionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any, private fb: FormBuilder,
    private cardSetSvc: CardSetService, private cardSvc: CardService,
    private router: Router) {
    
    this.cardAction = data.cardAction;
    this.cardToEditOrDelete = data.card;
  }

  ngOnInit(): void {
    this.createFormGroup = this.fb.group({
      setId: this.fb.control<number>(this.cardSetSvc.setSharingObjValue['id'], [ Validators.required ]),
      presented: this.fb.control<string>('', [ Validators.required ]),
      hidden: this.fb.control<string>('', [ Validators.required ]),
      imageFile: this.fb.control('')
    })

    if (this.cardToEditOrDelete) {
      this.editFormGroup = this.fb.group({
        setId: this.fb.control<number>(this.cardToEditOrDelete.setId),
        id: this.fb.control<number>(this.cardToEditOrDelete.id),
        presented: this.fb.control<string>(this.cardToEditOrDelete.presented, [ Validators.required ]),
        hidden: this.fb.control<string>(this.cardToEditOrDelete.hidden, [ Validators.required ]),
        imageFile: this.fb.control(this.cardToEditOrDelete.imageFile)
      })
    }
    
  }

  create() {
    this.cardToCreate = this.createFormGroup.value as Card;
    const formData = new FormData();
    formData.set("setId", this.cardToCreate.setId.toString());
    formData.set("presented", this.cardToCreate.presented);
    formData.set("hidden", this.cardToCreate.hidden);
    formData.set("imageFile", this.imageFile.nativeElement.files[0]);
    
    this.cardSvc.createCardBySetId(formData)
      .then(result => {
        console.log(result);
      }).catch(error => console.log(error));
    
    this.close();
  }

  edit() {
    this.cardToEditOrDelete = this.editFormGroup.value as Card;
    const formData = new FormData();
    formData.set("setId", this.cardToEditOrDelete.setId.toString());
    formData.set("id", this.cardToEditOrDelete.id.toString());
    formData.set("presented", this.cardToEditOrDelete.presented);
    formData.set("hidden", this.cardToEditOrDelete.hidden);
    formData.set("imageFile", this.imageFile.nativeElement.files[0]);

    this.cardSvc.updateCardById(formData)
      .then(result => {
        console.log(result);
      }).catch(error => console.log(error));

    this.close();

    this.router.navigate(['/set', this.cardSetSvc.setSharingObjValue['id'], 'edit']);
  }

  delete() {
    this.cardToEditOrDelete = this.editFormGroup.value as Card;
    this.cardSvc.deleteCardById(this.cardToEditOrDelete)
      .then(result => {
        console.log(result);
      }).catch(error => console.log(error));

    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
