import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReadingLevels } from '@global/reading-levels.global';
import { MultipleResponseModel } from '@models/multiple-response.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [ReadingLevels]
})
export class BooksComponent implements OnInit {

  booksData: MultipleResponseModel;

  constructor(private route: ActivatedRoute, private router: Router, private readingLevels: ReadingLevels) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: {books: any }) => {
        console.log(data.books)
        this.booksData = data.books;
      });
  }

}
