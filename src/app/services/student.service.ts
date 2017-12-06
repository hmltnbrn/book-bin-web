import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

  GetAllActiveStudents() {
    return this.http.get(environment.api + '/api/Students/ActiveStudents');
  }

  GetStudent(id: number) {
    return this.http.get(environment.api + '/api/Students/' + id);
  }

}
