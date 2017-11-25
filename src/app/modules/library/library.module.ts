import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library.routing';
import { SharedModule } from '@modules/shared/shared.module';

import { BookService } from '@services/book.service';

import { LibraryComponent } from './library.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BooksComponent } from './components/books/books.component';

@NgModule({
  imports: [
    LibraryRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    LibraryComponent,
    BooksComponent
  ],
  providers: [
    BookService
  ]
})
export class LibraryModule { }
