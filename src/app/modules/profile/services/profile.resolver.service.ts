import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from '@services/account.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProfileResolver implements Resolve<any> {
  constructor(private accountService: AccountService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.accountService.GetProfile().pipe(
      catchError(err => {
        return of(err.error);
      })
    );
  }
}
