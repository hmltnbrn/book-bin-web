import { Injectable } from '@angular/core';
import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard {
  canDeactivate(component: CanComponentDeactivate, nextState: RouterStateSnapshot, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(currentState.url == '/500') return true;
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
