import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AccountActivationResolver implements Resolve<any> {
  constructor(private accountService: AccountService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let token = route.paramMap.get('token');

    return this.accountService.ActivateAccount(token).catch(err => {
      this.router.navigate(['/']);
      return Observable.of(err.error);
    });
  }
}
