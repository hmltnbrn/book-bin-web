import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from '@services/storage.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  isAuthenticated = () => !!this.getToken();

  getUserId = () => this.storageService.getItem('userId');
  getUsername = () => this.storageService.getItem('username');
  getToken = () => this.storageService.getItem('token');
  getStaySignedIn = () => this.storageService.getItem('staySignedIn');

  setUserAuthentication(id, username, token, staySignedIn) {
    this.storageService.setItem('userId', id);
    this.storageService.setItem('username', username);
    this.storageService.setItem('token', token);
    this.storageService.setItem('staySignedIn', staySignedIn);
  }

  signOff() {
    this.storageService.removeItem('userId');
    this.storageService.removeItem('username');
    this.storageService.removeItem('token');
    this.storageService.removeItem('staySignedIn');
  }

}
