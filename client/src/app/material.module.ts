import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';

const matModules: any[] = [
  MatToolbarModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatDatepickerModule, MatNativeDateModule,
  MatButtonModule, MatTableModule, MatSelectModule,
  MatTooltipModule, MatCardModule, MatDividerModule,
  MatDialogModule, MatStepperModule, MatSnackBarModule,
  MatTabsModule, MatGridListModule
]

@NgModule({
  imports: matModules,
  exports: matModules
})
export class MaterialModule { }