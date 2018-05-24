import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BookService } from '@services/book.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class DashboardResolver implements Resolve<any> {
  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.bookService.GetDashboard().catch(err => {
      return Observable.of(err.error);
    });
  }
}
