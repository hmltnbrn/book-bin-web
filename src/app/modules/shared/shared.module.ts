import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material/material.module';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchComponent } from './components/search/search.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ErrorIndicatorComponent } from './components/error-indicator/error-indicator.component';
import { SuccessIndicatorComponent } from './components/success-indicator/success-indicator.component';
import { SuccessDialogComponent } from './components/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { WarningIndicatorComponent } from './components/warning-indicator/warning-indicator.component';
import { InfoIndicatorComponent } from './components/info-indicator/info-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    PaginatorComponent,
    SearchComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    ErrorIndicatorComponent,
    SuccessIndicatorComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    WarningIndicatorComponent,
    InfoIndicatorComponent
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    SuccessDialogComponent,
    ErrorDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LoadingSpinnerComponent,
    PaginatorComponent,
    SearchComponent,
    ErrorIndicatorComponent,
    SuccessIndicatorComponent,
    WarningIndicatorComponent,
    InfoIndicatorComponent
  ]
})
export class SharedModule { }
