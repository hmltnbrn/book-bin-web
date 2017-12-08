import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from '@services/book.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassValidator } from '@validators/class.validator';
import { MomentValidator } from '@validators/moment.validator';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

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

  studentControl: FormControl = new FormControl('', [Validators.required, ClassValidator(Student)]);
  dateControl: FormControl = new FormControl('', MomentValidator());

  students: Array<any> = [];
  filteredStudents: Observable<Student[]>;

  bookId: number;
  dueDate: any;

  isLoading: boolean = false;
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

  addTime() {
    if(this.dateControl.valid && this.dateControl.value) {
      this.dateControl.setValue(<moment.Moment>(this.dateControl.value).add(14, 'd'));
    }
    else {
      this.dateControl.setValue(moment().add(14, 'd'));
    }
  }

  checkOutBook(studentId: number) {
    let dueDate: number;
    if(this.dateControl.value) dueDate = (<moment.Moment>this.dateControl.value).startOf('day').unix();
    this.apiError = "";
    this.isLoading = true;
    this.bookService.CheckOutBook(this.bookId, studentId, dueDate).subscribe(
      data => {
        console.log(data);
        this.isSubmitted = true;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.onError(error);
        this.isLoading = false;
      });
  }

  onError(error) {
    if(error.status === 500) this.dialogRef.close(false);
    else this.apiError = error.error.message;
  }

  onSubmit() {
    this.checkOutBook(this.studentControl.value.id);
  }

}
