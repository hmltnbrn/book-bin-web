import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { MultipleResponseModel } from '@models/multiple-response.model';

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

  GetAllTeacherStudents(returnAll?: string, page?: string, pageSize?: string, search?: string) {
    let params = new HttpParams();
    params = params.append('returnAll', returnAll ? returnAll: '');
    params = params.append('page', page ? page: '0');
    params = params.append('pageSize', pageSize ? pageSize : '0');
    params = params.append('search', search ? search : '');
    return this.http.get<MultipleResponseModel>(environment.api + '/api/Students/TeacherStudents', {
      params: params
    });
  }

  GetStudent(id: number) {
    return this.http.get(environment.api + '/api/Students/' + id);
  }

}
