import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AccountActivationResolver implements Resolve<any> {
  constructor(private accountService: AccountService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let token = route.paramMap.get('token');

    return this.accountService.ActivateAccount(token).pipe(
      catchError(err => {
        this.router.navigate(['/']);
        return of(err.error);
      })
    );
  }
}
