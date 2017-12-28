import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from '@services/book.service';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '@modules/shared/components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '@modules/shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { StudentCheckOutComponent } from '@modules/library/components/dialogs/student-check-out/student-check-out.component';
import { StudentCheckInComponent } from '@modules/library/components/dialogs/student-check-in/student-check-in.component';
import { BookDeleteComponent } from '@modules/library/components/dialogs/book-delete/book-delete.component';
import { BookAdvancedSearchComponent } from '@modules/library/components/dialogs/book-advanced-search/book-advanced-search.component';
import { Alphabet } from '@global/alphabet.global';
import { MultipleResponseModel } from '@models/multiple-response.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BookService, Alphabet]
})
export class BookListComponent implements OnInit {

  booksData: MultipleResponseModel;
  studentsData: any;
  totalItems: number;

  selectLevel: string;

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService, private dialog: MatDialog, private alphabet: Alphabet) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { books: any, students: any }) => {
        console.log(data.books)
        console.log(data.students)
        this.booksData = data.books;
        this.studentsData = data.students;
        this.totalItems = data.books["totalItems"];
      });
    this.route.queryParams.subscribe(params => {
      this.selectLevel = params["readingLevel"] || '';
    });
  }

  checkOutDialog(id: number, title: string): void {
    let dialogRef = this.dialog.open(StudentCheckOutComponent, {
      minWidth: '250px',
      maxWidth: '550px',
      width: '80vw',
      disableClose: true,
      data: { title: title, students: this.studentsData.result, bookId: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result) this.reduceCount(id);
    });
  }

  checkInDialog(id: number, title: string): void {
    let dialogRef = this.dialog.open(StudentCheckInComponent, {
      minWidth: '250px',
      maxWidth: '550px',
      width: '80vw',
      disableClose: true,
      data: { title: title, bookId: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result) this.increaseCount(id);
    });
  }

  deleteDialog(id, title, numberOut) {
    let dialogRef = this.dialog.open(BookDeleteComponent, {
      minWidth: '250px',
      maxWidth: '550px',
      width: '80vw',
      disableClose: true,
      data: { title: title, bookId: id, numberOut: numberOut }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result) this.removeFromData(id);
    });
  }

  advancedSearchDialog(): void {
    let dialogRef = this.dialog.open(BookAdvancedSearchComponent, {
      minWidth: '250px',
      maxWidth: '550px',
      width: '80vw',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  reduceCount(book_id) {
    for(var i=0; i<this.booksData.result.length; i++) {
      if(this.booksData.result[i].id == book_id) {
        this.booksData.result[i].number_in -= 1;
        this.booksData.result[i].number_out += 1;
        break;
      }
    }
  }

  increaseCount(book_id) {
    for(var i=0; i<this.booksData.result.length; i++) {
      if(this.booksData.result[i].id == book_id) {
        this.booksData.result[i].number_in += 1;
        this.booksData.result[i].number_out -= 1;
        break;
      }
    }
  }

  removeFromData(id) {
    for(var i=0; i<this.booksData.result.length; i++) {
      if(this.booksData.result[i].id == id) {
        this.booksData.result.splice(i, 1);
        break;
      }
    }
    this.totalItems--;
  }

  onReadingLevelClick(letter) {
    this.selectLevel = letter;
    let newParams;
    this.route.queryParams.subscribe(params => {
      newParams = JSON.parse(JSON.stringify(params));
    });
    newParams["readingLevel"] = letter;
    this.router.navigate(['/library/books'], { queryParams: newParams });
  }

}
