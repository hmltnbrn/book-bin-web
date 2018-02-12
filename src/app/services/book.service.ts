import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
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

  GetAllTeacherBooks(page?: string, pageSize?: string, search?: string, readingLevel?: string) {
    let params = new HttpParams();
    params = params.append('page', page ? page: '0');
    params = params.append('pageSize', pageSize ? pageSize : '0');
    params = params.append('search', search ? search : '');
    params = params.append('readingLevel', readingLevel ? readingLevel : '');
    return this.http.get<MultipleResponseModel>(environment.api + '/api/Books/TeacherBooks', {
      params: params
    });
  }

  GetTeacherBook(id: number) {
    return this.http.get(environment.api + '/api/Books/TeacherBooks/' + id);
  }

  AddEditBook(book) {
    return this.http.post(environment.api + '/api/Books/TeacherBooks', book).delay(1000);
  }

  DeleteBook(id: number) {
    return this.http.delete(environment.api + '/api/Books/TeacherBooks/' + id).delay(1000);
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

  CheckInBookForSudents(id, students) {
    let body = { book_id: id, students: students };
    return this.http.post(environment.api + '/api/Books/CheckIn/Students', body).delay(1000);
  }

  GetDashboard() {
    return this.http.get(environment.api + '/api/Books/Dashboard');
  }

}
