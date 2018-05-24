import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from '@services/book.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassValidator } from '@validators/class.validator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export class Student {
  name: string;
  constructor(public id: number, public firstName: string, public lastName: string) {
    this.name = firstName + " " + lastName;
  }
}

@Component({
  selector: 'dialog-student-check-in',
  templateUrl: './student-check-in.component.html',
  styleUrls: ['./student-check-in.component.scss'],
  providers: [BookService]
})
export class StudentCheckInComponent {

  studentControl: FormControl = new FormControl('', [Validators.required, ClassValidator(Student)]);

  students: Array<any> = [];
  filteredStudents: Observable<Student[]>;

  bookId: number;

  isLoading: boolean = true;
  isSubmitted: boolean = false;

  apiError: string;

  constructor(
    public dialogRef: MatDialogRef<StudentCheckInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService
  ) {
    this.bookId = data.bookId;
  }

  ngOnInit() {
    this.filteredStudents = this.studentControl.valueChanges
      .pipe(
        startWith({} as Student),
        map(student => student && typeof student === 'object' ? student.name : student),
        map(name => name ? this.filter(name) : this.students.slice())
      );
    this.getStudentsWithBook(this.bookId);
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

  getStudentsWithBook(id: number) {
    this.bookService.GetStudentsWithBook(id).subscribe(
      data => {
        console.log(data);
        this.createStudents(data["result"]);
      },
      error => {
        console.log(error);
      });
  }

  createStudents(students) {
    for(var i=0; i<students.length; i++) {
      this.students.push(new Student(students[i].id, students[i].first_name, students[i].last_name));
    }
    this.isLoading = false;
  }

  checkInBook(studentId: number) {
    console.log(this.studentControl.value)
    this.apiError = "";
    this.isLoading = true;
    this.bookService.CheckInBook(this.bookId, studentId).subscribe(
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
    this.checkInBook(this.studentControl.value.id);
  }

}
