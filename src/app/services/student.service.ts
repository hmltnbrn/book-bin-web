import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

  GetAllStudents() {
    var body = "";
    return this.http.post(environment.api + '/Students', JSON.stringify(body));
  }

  GetStudent(id: number) {
    var body = "";
    return this.http.post(environment.api + '/Students/' + id, JSON.stringify(body));
  }

}
