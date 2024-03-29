import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library.routing';
import { SharedModule } from '@modules/shared/shared.module';

import { BookService } from '@services/book.service';
import { StudentService } from '@services/student.service';

import { LibraryComponent } from './library.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BooksComponent } from './components/books/books.component';
import { StudentCheckOutComponent } from './components/dialogs/student-check-out/student-check-out.component';
import { StudentCheckInComponent } from './components/dialogs/student-check-in/student-check-in.component';
import { BookListComponent } from './components/books/components/book-list/book-list.component';
import { BookAddComponent } from './components/books/components/book-add/book-add.component';
import { BookDetailComponent } from './components/books/components/book-detail/book-detail.component';
import { BookDeleteComponent } from './components/dialogs/book-delete/book-delete.component';
import { BookAdvancedSearchComponent } from './components/dialogs/book-advanced-search/book-advanced-search.component';
import { AddEntityComponent } from './components/dialogs/add-entity/add-entity.component';

import { StudentsComponent } from './components/students/students.component';

@NgModule({
  imports: [
    LibraryRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    LibraryComponent,
    BooksComponent,
    StudentCheckOutComponent,
    StudentCheckInComponent,
    BookListComponent,
    BookAddComponent,
    BookDetailComponent,
    BookDeleteComponent,
    BookAdvancedSearchComponent,
    AddEntityComponent,
    StudentsComponent
  ],
  entryComponents: [
    StudentCheckOutComponent,
    StudentCheckInComponent,
    BookDeleteComponent,
    BookAdvancedSearchComponent,
    AddEntityComponent
  ],
  providers: [
    BookService,
    StudentService
  ]
})
export class LibraryModule { }
