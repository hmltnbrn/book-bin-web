import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { StorageService } from '../storage.service';

@Injectable()
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private storageService: StorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkNotLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkNotLogin(url);
  }

  checkNotLogin(url: string): boolean {
    let auth: any = this.storageService.getItem("token");
    if (auth) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
