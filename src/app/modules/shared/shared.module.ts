import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@modules/material/material.module';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    PaginatorComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    LoadingSpinnerComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
