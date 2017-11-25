import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@services/guards/auth.guard.service';

import { AllBooksResolver } from './components/books/services/books.resolver.service';

import { LibraryComponent } from './library.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BooksComponent } from './components/books/books.component';

const routes: Routes = [
  { 
    path: '',
    component: LibraryComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'books',
        component: BooksComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
          books: AllBooksResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [
    AllBooksResolver
  ]
})
export class LibraryRoutingModule { }
