import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { StorageService } from '../storage.service';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private storageService: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth: any;
    const authData = this.storageService.getItem("token");
    if (authData) {
      auth = authData;
    }
    const authReq = req.clone({ setHeaders: { Authorization: 'BearerJWT ' + auth } });
    return next.handle(authReq).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {

      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log(err)
          this.router.navigate(['/signout'], { queryParams: { redirectFor: err.error.message } });
        }
        if (err.status === 500) {
          console.log(err)
          this.router.navigate(['/500'], { skipLocationChange: true });
        }
      }
    });
  }

}
