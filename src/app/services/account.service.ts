import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  Register(user) {
    return this.http.post(environment.api + '/auth/signup', user);
  }

  SignIn(user) {
    return this.http.post(environment.api + '/auth/signin', user);
  }

  ActivateAccount(token) {
    return this.http.post(environment.api + '/auth/activate', 'token=' + token, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  ForgotPassword(email) {
    return this.http.post(environment.api + '/auth/forgotpassword', email);
  }

  ResetPassword(data) {
    return this.http.post(environment.api + '/auth/resetpassword', data);
  }

}
