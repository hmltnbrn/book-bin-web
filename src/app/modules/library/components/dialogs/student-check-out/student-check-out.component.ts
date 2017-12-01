import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from '@services/book.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypeValidator } from '@validators/type.validator';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

export class Student {
  name: string;
  constructor(public id: number, public firstName: string, public lastName: string) {
    this.name = firstName + " " + lastName;
  }
}

@Component({
  selector: 'dialog-student-check-out',
  templateUrl: './student-check-out.component.html',
  styleUrls: ['./student-check-out.component.scss'],
  providers: [BookService]
})
export class StudentCheckOutComponent {

  studentControl: FormControl = new FormControl('', [Validators.required, TypeValidator(Student)]);

  students: Array<any> = [];
  filteredStudents: Observable<Student[]>;

  bookId: number;

  isSubmitted: boolean = false;

  apiError: string;

  constructor(public dialogRef: MatDialogRef<StudentCheckOutComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private bookService: BookService) {
    for(var i=0; i<data.students.length; i++) {
      this.students.push(new Student(data.students[i].id, data.students[i].first_name, data.students[i].last_name));
    }
    this.bookId = data.bookId;
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
    return this.students.filter(student =>
      student.firstName.toLowerCase().indexOf(name.toLowerCase()) === 0 || 
      student.lastName.toLowerCase().indexOf(name.toLowerCase()) === 0 || 
      student.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  displayFn(student): string {
    return student ? student.name : student;
  }

  checkOutBook(studentId: number) {
    this.apiError = "";
    this.bookService.CheckOutBook(this.bookId, studentId).subscribe(
      data => {
        console.log(data);
        this.isSubmitted = true;
      },
      error => {
        console.log(error);
        this.onError(error);
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.checkOutBook(this.studentControl.value.id);
  }

  onOk(): void {
    this.dialogRef.close(true);
  }

  onError(error) {
    if(error.status === 500) this.dialogRef.close(false);
    else this.apiError = error.error.message;
  }

}
