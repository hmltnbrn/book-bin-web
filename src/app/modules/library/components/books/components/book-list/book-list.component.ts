import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from '@services/book.service';
import { MatDialog } from '@angular/material';
import { StudentCheckOutComponent } from '@modules/library/components/dialogs/student-check-out/student-check-out.component';
import { StudentCheckInComponent } from '@modules/library/components/dialogs/student-check-in/student-check-in.component';
import { ReadingLevels } from '@global/reading-levels.global';
import { MultipleResponseModel } from '@models/multiple-response.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BookService, ReadingLevels]
})
export class BookListComponent implements OnInit {

  booksData: MultipleResponseModel;
  studentsData: any;

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService, private dialog: MatDialog, private readingLevels: ReadingLevels) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { books: any, students: any }) => {
        console.log(data.books)
        console.log(data.students)
        this.booksData = data.books;
        this.studentsData = data.students;
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

}
