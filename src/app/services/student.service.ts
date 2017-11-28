import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

  GetAllActiveStudents() {
    return this.http.get(environment.api + '/api/Students/GetAllActiveStudents');
  }

  GetStudent(id: number) {
    var body = "";
    return this.http.post(environment.api + '/api/Students/' + id, JSON.stringify(body));
  }

}
