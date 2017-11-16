import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  Register(user) {
    return this.http.post(environment.api + '/auth/register', user);
  }

  SignIn(user) {
    return this.http.post(environment.api + '/auth/signin', user);
  }

}
