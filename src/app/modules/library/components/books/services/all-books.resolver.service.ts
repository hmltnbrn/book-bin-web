import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BookService } from '@services/book.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AllBooksResolver implements Resolve<any> {
  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
    let pageSize = route.queryParams['pageSize'] ? route.queryParams['pageSize'] : '12';
    let search = route.queryParams['search'] ? route.queryParams['search'] : '';
    let readingLevel = route.queryParams['readingLevel'] ? route.queryParams['readingLevel'] : '';

    return this.bookService.GetAllTeacherBooks(page, pageSize, search, readingLevel).pipe(
      catchError(err => {
        return of(err.error);
      })
    );
  }
}
