import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from '@services/book.service';
import { MatDialog } from '@angular/material';
import { StudentCheckOutComponent } from '@modules/library/components/dialogs/student-check-out/student-check-out.component';
import { ReadingLevels } from '@global/reading-levels.global';
import { MultipleResponseModel } from '@models/multiple-response.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BookService, ReadingLevels]
})
export class BooksComponent implements OnInit {

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
      data: { title: title, students: this.studentsData.result, bookId: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      //if(result) this.checkOutBook(id, result);
    });
  }

  checkOutBook(bookId: number, studentId: number) {
    this.bookService.CheckOutBook(bookId, studentId).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
