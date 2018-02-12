import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  Register(user) {
    return this.http.post(environment.api + '/auth/SignUp', user);
  }

  SignIn(user) {
    return this.http.post(environment.api + '/auth/SignIn', user);
  }

  ActivateAccount(token) {
    return this.http.post(environment.api + '/auth/Activate', 'token=' + token, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  ForgotPassword(email) {
    return this.http.post(environment.api + '/auth/ForgotPassword', email);
  }

  ResetPassword(data) {
    return this.http.post(environment.api + '/auth/ResetPassword', data);
  }

  ForgotUsername(email) {
    return this.http.post(environment.api + '/auth/ForgotUsername', email);
  }

  ChangePassword(passwords) {
    return this.http.post(environment.api + '/auth/ChangePassword', passwords);
  }

  GetProfile() {
    return this.http.get(environment.api + '/auth/Profile');
  }

}
