import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-book-advanced-search',
  templateUrl: './book-advanced-search.component.html',
  styleUrls: ['./book-advanced-search.component.scss']
})
export class BookAdvancedSearchComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BookAdvancedSearchComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
