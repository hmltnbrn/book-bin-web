import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MultipleResponseModel } from '@models/multiple-response.model';
import 'rxjs/add/operator/delay';

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

  GetAllTeacherBooks(page?: string, pageSize?: string, search?: string) {
    let params = new HttpParams();
    params = params.append('page', page ? page: '0');
    params = params.append('pageSize', pageSize ? pageSize : '0');
    params = params.append('search', search ? search : '');
    return this.http.get<MultipleResponseModel>(environment.api + '/api/Books/TeacherBooks', {
      params: params
    });
  }

  GetStudentsWithBook(bookId) {
    let params = new HttpParams();
    params = params.append('book_id', bookId);
    return this.http.get(environment.api + '/api/Books/Students', {
      params: params
    });
  }

  CheckOutBook(bookId: number, studentId: number, dueDate: number) {
    let body = { book_id: bookId, student_id: studentId, date_due: dueDate };
    return this.http.post(environment.api + '/api/Books/CheckOut', body).delay(1000);
  }

  CheckInBook(bookId: number, studentId: number) {
    let body = { book_id: bookId, student_id: studentId };
    return this.http.post(environment.api + '/api/Books/CheckIn', body).delay(1000);
  }

}
