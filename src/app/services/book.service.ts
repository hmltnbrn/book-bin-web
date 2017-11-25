import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MultipleResponseModel } from '@models/multiple-response.model';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  GetAllBooks(page?: string, pageSize?: string, search?: string) {
    let params = new HttpParams();
    params = params.append('page', page ? page: '0');
    params = params.append('pageSize', pageSize ? pageSize : '0');
    params = params.append('search', search ? search : '');
    return this.http.get<MultipleResponseModel>(environment.api + '/api/Books', {
      params: params
    });
  }

  GetBook(id: number) {
    return this.http.get(environment.api + '/api/Books/' + id);
  }

  GetAllTeacherBooks(page?: string, pageSize?: string) {
    let params = new HttpParams();
    params = params.append('page', page ? page: '0');
    params = params.append('pageSize', pageSize ? pageSize : '0');
    return this.http.get(environment.api + '/api/Books/GetAllTeacherBooks', {
      params: params
    });
  }

}
