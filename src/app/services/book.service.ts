import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  GetAllBooks() {
    return this.http.get(environment.api + '/api/books');
  }

  GetBook(id: number) {
    return this.http.get(environment.api + '/api/books/' + id);
  }

}
