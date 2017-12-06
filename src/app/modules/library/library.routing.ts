import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@services/guards/auth.guard.service';
import { CanDeactivateGuard } from '@services/guards/can-deactivate.guard.service';

import { AllBooksResolver } from './components/books/services/all-books.resolver.service';
import { BookDetailResolver } from './components/books/services/book-detail.resolver.service';
import { AllActiveStudentsResolver } from './components/books/services/active-students.resolver.service';

import { LibraryComponent } from './library.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BooksComponent } from './components/books/books.component';
import { BookListComponent } from './components/books/components/book-list/book-list.component';
import { BookDetailComponent } from './components/books/components/book-detail/book-detail.component';

const routes: Routes = [
  { 
    path: '',
    component: LibraryComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'books',
            component: BooksComponent,
            canActivateChild: [AuthGuard],
            children: [
              {
                path: '',
                component: BookListComponent,
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                resolve: {
                  books: AllBooksResolver,
                  students: AllActiveStudentsResolver
                }
              },
              {
                path: ':id',
                component: BookDetailComponent,
                canDeactivate: [CanDeactivateGuard],
                resolve: {
                  book: BookDetailResolver
                }
              }
            ]
          },
          {
            path: 'dashboard',
            component: DashboardComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [
    AllBooksResolver,
    BookDetailResolver,
    AllActiveStudentsResolver
  ]
})
export class LibraryRoutingModule { }
