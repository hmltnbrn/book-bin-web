import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() totalItems: number;
  @Input() pageSize: number;
  @Input() pageTotal: number;
  @Input() pageUrl: string;

  pageSizeOptions: Array<any> = [6, 12, 24, 48, 96];

  pageIndex: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pageIndex = parseInt(params["page"]) - 1 || 0;
      if(params["pageSize"]) this.pageSize = parseInt(params["pageSize"]);
    });
  }

  parsePreviousEllipsis() {
    let newPage = Math.ceil((this.pageIndex - 1) / 2);
    this.goToPage({ pageIndex: newPage, pageSize: this.pageSize });
  }

  parseNextEllipsis() {
    let newPage = Math.ceil((this.pageIndex - 1 + this.pageTotal) / 2);
    this.goToPage({ pageIndex: newPage, pageSize: this.pageSize });
  }

  parsePage(page) {
    this.goToPage({ pageIndex: page, pageSize: this.pageSize });
  }

  goToPage(event) {
    let newParams;
    this.route.queryParams.subscribe(params => {
      newParams = JSON.parse(JSON.stringify(params));
    });
    newParams["page"] = event.pageIndex + 1;
    newParams["pageSize"] = event.pageSize;
    this.router.navigate([this.pageUrl], { queryParams: newParams });
  }

}
