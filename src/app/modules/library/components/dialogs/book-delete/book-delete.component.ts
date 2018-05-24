import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookService } from '@services/book.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.scss']
})
export class BookDeleteComponent {

  bookId: number;

  isLoading: boolean = false;
  isDeleted: boolean = false;

  apiError: string;

  constructor(
    public dialogRef: MatDialogRef<BookDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService
  ) {
    this.bookId = data.bookId;
  }

  deleteBook() {
    this.apiError = "";
    this.isLoading = true;
    this.bookService.DeleteBook(this.bookId).subscribe(
      data => {
        console.log(data);
        this.isDeleted = true;
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
    this.deleteBook();
  }

}
