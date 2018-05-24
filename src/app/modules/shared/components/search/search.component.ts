import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() placeholderText: string;
  @Input() pageUrl: string;

  search: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.search = params["search"];
    });
  }

  onSearch() {
    let newParams;
    this.route.queryParams.subscribe(params => {
      newParams = JSON.parse(JSON.stringify(params));
    });
    newParams["search"] = this.search;
    newParams["page"] = 1;
    this.router.navigate([this.pageUrl], { queryParams: newParams });
  }

}
