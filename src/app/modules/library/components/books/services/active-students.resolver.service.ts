import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { StudentService } from '@services/student.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AllActiveStudentsResolver implements Resolve<any> {
  constructor(private studentService: StudentService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let returnAll = 'true';
    let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
    let pageSize = route.queryParams['pageSize'] ? route.queryParams['pageSize'] : '12';
    let search = route.queryParams['search'] ? route.queryParams['search'] : '';

    return this.studentService.GetAllTeacherStudents(returnAll, page, pageSize, search).catch(err => {
      return Observable.of(err.error);
    });
  }
}
