import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { BookService } from '@services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  providers: [BookService]
})
export class BookDetailComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { book: any }) => {
        console.log(data.book);
        this.createForm(data.book);
      });
  }

  createForm(book) {
    this.bookForm = new FormGroup({
      id: new FormControl(book.id),
      teacher_id: new FormControl(book.teacher_id),
      title: new FormControl(book.title, Validators.required),
      author: new FormControl(book.author, Validators.required),
      genres: new FormArray((<string[]>book.genres).map(val => new FormControl(val))),
      description: new FormControl(book.description),
      reading_level: new FormControl(book.reading_level, Validators.required),
      number_in: new FormControl(book.number_in, Validators.required),
      number_out: new FormControl(book.number_out, Validators.required)
    });
  }

}
