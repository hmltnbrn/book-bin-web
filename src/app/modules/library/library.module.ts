import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library.routing';
import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '../material/material.module';

import { LibraryComponent } from './components/library/library.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LibraryRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    LibraryComponent
  ]
})
export class LibraryModule { }
