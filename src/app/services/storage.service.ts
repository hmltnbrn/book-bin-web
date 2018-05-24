import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  getItem(key: any) {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: any, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: any) {
    localStorage.removeItem(key);
  }

}
