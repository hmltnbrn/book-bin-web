import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

export class Student {
  constructor(public name: string, public id: number) { }
}

@Component({
  selector: 'dialog-student-check-out',
  templateUrl: './student-check-out.component.html',
  styleUrls: ['./student-check-out.component.scss']
})
export class StudentCheckOutComponent {

  studentControl: FormControl = new FormControl('', Validators.required);

  students: Array<any> = [];
  filteredStudents: Observable<Student[]>;

  constructor(public dialogRef: MatDialogRef<StudentCheckOutComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    for(var i=0; i<data.students.length; i++) {
      this.students.push(new Student(data.students[i].first_name + ' ' + data.students[i].last_name, data.students[i].id));
    }
  }

  ngOnInit() {
    this.filteredStudents = this.studentControl.valueChanges
      .pipe(
        startWith({} as Student),
        map(student => student && typeof student === 'object' ? student.name : student),
        map(name => name ? this.filter(name) : this.students.slice())
      );
  }

  filter(name): Student[] {
    return this.students.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(student): string {
    return student ? student.name : student;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.dialogRef.close(this.studentControl.value.id);
  }

}
