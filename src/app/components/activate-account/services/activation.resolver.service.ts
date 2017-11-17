import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { AccountService } from '../../../services/account.service';

@Injectable()
export class AccountActivationResolver implements Resolve<any> {
  constructor(private accountService: AccountService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let token = route.paramMap.get('token');

    return this.accountService.ActivateAccount(token).map(result => {
      if (result["status"]) {
        return result;
      } else {
        this.router.navigate(['/']);
      }
    }).first();
  }
}
