import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  getItem(key: any) {
    return localStorage.getItem(key);
  }

  setItem(key: any, value: any) {
    if(typeof value == 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    }
    localStorage.setItem(key, value);
  }

  removeItem(key: any) {
    localStorage.removeItem(key);
  }

}
