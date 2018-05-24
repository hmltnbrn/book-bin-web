import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) overduePaginator: MatPaginator;

  topBooks: MatTableDataSource<Element>;
  topReaders: MatTableDataSource<Element>;
  overdueBooks: MatTableDataSource<Element>;
  recentActivity;

  separatorKeysCodes = [ENTER, COMMA];
  topBooksColumns = ['title', 'author', 'times_out'];
  topReadersColumns = ['name', 'books_read'];
  overdueBooksColumns = ['name', 'title', 'due_date'];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { dashboard: any }) => {
        console.log(data.dashboard);
        this.topBooks = new MatTableDataSource<Element>(data.dashboard["top_books"]);
        this.topReaders = new MatTableDataSource<Element>(data.dashboard["top_readers"]);
        this.overdueBooks = new MatTableDataSource<Element>(data.dashboard["overdue_books"]);
        this.recentActivity = data.dashboard["recent_activity"];
      });
  }

  ngAfterViewInit() {
    this.overdueBooks.paginator = this.overduePaginator;
  }

  formatDate(date) {
    return date ? moment.unix(date).format('MMMM D, YYYY') : '';
  }

  formatDateTime(date) {
    return date ? moment.unix(date).format('MMMM D, YYYY h:mm a') : '';
  }

  formatFromDate(date) {
    return date ? moment.unix(date).fromNow() : '';
  }

}
