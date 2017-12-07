import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { BookService } from '@services/book.service';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  providers: [BookService]
})
export class BookDetailComponent implements OnInit {

  separatorKeysCodes = [ENTER, COMMA];

  bookForm: FormGroup;
  bookData: object;
  studentCurrent;
  studentHistory;

  currentColumns = ['name', 'checked_out', 'date_due'];
  historyColumns = ['name', 'checked_out', 'checked_in'];

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { book: any }) => {
        console.log(data.book);
        this.bookData = data.book["book"];
        this.studentCurrent = new MatTableDataSource<Element>(data.book["studentCurrent"]);
        this.studentHistory = new MatTableDataSource<Element>(data.book["studentHistory"]);
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
      available: new FormControl(book.available)
    });
  }

  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? 'You must enter a value' : '';
  }

  addGenre(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      (<FormArray>this.bookForm.controls.genres).push(new FormControl(value.trim()));
    }

    if (input) {
      input.value = '';
    }
  }

  removeGenre(genre: any): void {
    let control = (<FormArray>this.bookForm.controls.genres);
    let index = control.controls.indexOf(genre);

    if (index >= 0) {
      control.removeAt(index);
    }
  }

  formatDate(date) {
    return date ? moment.unix(date).format('MMMM D, YYYY, h:mm:ss a') : '';
  }

  dueDateStyle(date) {
    return moment.unix(date).isBefore(moment());
  }

  resetForm() {
    this.createForm(this.bookData);
  }

  onSubmit() {
    console.log(this.bookForm.value);
    this.bookService.AddEditBook(this.bookForm.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
