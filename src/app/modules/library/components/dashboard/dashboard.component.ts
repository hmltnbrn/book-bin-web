import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [BookService]
})
export class DashboardComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.GetAllBooks().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
