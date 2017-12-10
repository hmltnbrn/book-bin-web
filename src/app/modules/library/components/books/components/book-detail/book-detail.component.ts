import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { BookService } from '@services/book.service';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '@modules/shared/components/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '@modules/shared/components/dialogs/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '@modules/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import * as moment from 'moment';
import { BookTotalValidator } from '@validators/book-total.validator';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  providers: [BookService]
})
export class BookDetailComponent implements OnInit {

  genreControl: FormControl = new FormControl('', Validators.required);

  bookForm: FormGroup;
  bookData: object;
  studentCurrent: MatTableDataSource<Element>;
  studentHistory: MatTableDataSource<Element>;

  separatorKeysCodes = [ENTER, COMMA];
  currentColumns = ['name', 'checked_out', 'date_due'];
  historyColumns = ['name', 'checked_out', 'checked_in'];

  studentsCheckIn: Array<any> = [];

  formError: string;
  isLoading = false;

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { book: any }) => {
        console.log(data.book);
        this.bookData = data.book["book"];
        this.studentCurrent = new MatTableDataSource<Element>(data.book["student_current"]);
        this.studentHistory = new MatTableDataSource<Element>(data.book["student_history"]);
        this.createForm(data.book["book"]);
      });
  }

  createForm(book) {
    this.bookForm = new FormGroup({
      id: new FormControl(book.id),
      title: new FormControl(book.title, Validators.required),
      author: new FormControl(book.author, Validators.required),
      genres: new FormArray((<string[]>book.genres).map(val => new FormControl(val)), Validators.required),
      description: new FormControl(book.description),
      reading_level: new FormControl(book.reading_level, Validators.required),
      number_in: new FormControl(book.number_in, Validators.required),
      number_out: new FormControl(book.number_out, Validators.required),
      total: new FormControl(book.number_in + book.number_out, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      available: new FormControl(book.available)
    }, BookTotalValidator.CheckTotal);
    this.genreControl.setValue('a'.repeat(book.genres.length));
  }

  getErrorMessage(control: FormControl) {
    if(control.hasError('required')) {
      return 'You must enter a value'
    }
    else if (control.hasError('lowTotal')) {
      return 'Value cannot be less than the number of books checked out.'
    }
    else if (control.hasError('zeroTotal')) {
      return 'Value cannot be zero or negative. Consider making this book unavailable.'
    }
    else if (control.hasError('pattern')) {
      return 'Invalid input'
    }
    else {
      return '';
    }
  }

  addGenre(event: MatChipInputEvent) {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      (<FormArray>this.bookForm.controls.genres).push(new FormControl(value.trim()));
      this.genreControl.setValue(this.genreControl.value + 'a');
      this.bookForm.markAsDirty();
    }

    if (input) {
      input.value = '';
    }
  }

  removeGenre(genre: any) {
    let control = (<FormArray>this.bookForm.controls.genres);
    let index = control.controls.indexOf(genre);

    if (index >= 0) {
      control.removeAt(index);
      this.genreControl.setValue(this.genreControl.value.slice(0, -1));
      this.bookForm.markAsDirty();
    }
  }

  formatDate(date) {
    return date ? moment.unix(date).format('MMMM D, YYYY') : '';
  }

  dueDateStyle(date) {
    return moment.unix(date).isBefore(moment());
  }

  resetForm() {
    this.createForm(this.bookData);
  }

  newNumberIn() {
    let numberOut = this.bookForm.value.number_out;
    let total = this.bookForm.value.total;
    if(total == numberOut) {
      return 0;
    }
    else {
      return total - numberOut;
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.bookForm.controls.number_in.setValue(this.newNumberIn());
    let finalValues = this.bookForm.value;
    delete finalValues.total;
    console.log(finalValues);
    this.bookService.AddEditBook(finalValues).subscribe(
      data => {
        console.log(data);
        this.bookData = data;
        this.bookForm.markAsPristine();
        this.isLoading = false;
        this.studentsCheckIn = [];
        this.afterSubmit();
      },
      error => {
        console.log(error);
      });
  }

  afterSubmit() {
    let dialogRef = this.dialog.open(SuccessDialogComponent, {
      minWidth: '250px',
      maxWidth: '550px',
      width: '80vw',
      data: { title: 'Update Complete', message: 'Book has been successfully updated.' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  onRowClick(id) {
    let index = this.studentsCheckIn.indexOf(id);
    if(index >= 0) {
      this.studentsCheckIn.splice(index, 1);
    }
    else {
      this.studentsCheckIn.push(id);
    }
  }

  checkRow(id) {
    return this.studentsCheckIn.indexOf(id) >= 0 ? true : false;
  }

  checkInBooks() {
    this.isLoading = true;
    this.bookService.CheckInBookForSudents(this.bookData["id"], this.studentsCheckIn).subscribe(
      data => {
        console.log(data);
        this.bookData = data["book"];
        this.studentCurrent = new MatTableDataSource<Element>(data["student_current"]);
        this.studentHistory = new MatTableDataSource<Element>(data["student_history"]);
        this.studentsCheckIn = [];
        this.createForm(data["book"]);
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.onCheckInError(error);
      });
  }

  onCheckInError(error) {
    let dialogRef = this.dialog.open(ErrorDialogComponent, {
      minWidth: '250px',
      maxWidth: '550px',
      width: '80vw',
      data: { title: 'Check In Error', message: error.error.message }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if(this.bookForm.dirty) {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        minWidth: '250px',
        maxWidth: '550px',
        width: '80vw',
        disableClose: true,
        data: {
          title: 'Confirm Navigation',
          message: 'Are you sure you want to leave this page? All unsaved changes will be lost.'
        }
      });
      return dialogRef.afterClosed().map(result => {
        console.log(result)
        if(result) return true;
        else return false;
      });
    }
    return true;
  }

}
