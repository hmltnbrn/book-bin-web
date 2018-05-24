import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { StudentService } from '@services/student.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AllActiveStudentsResolver implements Resolve<any> {
  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
    let pageSize = route.queryParams['pageSize'] ? route.queryParams['pageSize'] : '12';

    return this.studentService.GetAllTeacherStudents('true', page, pageSize).pipe(
      catchError(err => {
        return of(err.error);
      })
    );
  }
}
