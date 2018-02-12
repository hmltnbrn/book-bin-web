import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-width-search',
  templateUrl: './full-width-search.component.html',
  styleUrls: ['./full-width-search.component.scss']
})
export class FullWidthSearchComponent implements OnInit {

  @Input() placeholderText: string;
  @Input() pageUrl: string;
  @Input() instantSearch: boolean = false;

  @Output() advancedSearch = new EventEmitter();

  search: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.search = params["search"];
    });
  }

  onChange() {
    if(this.instantSearch) this.onSearch();
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

  onAdvancedSearch() {
    this.advancedSearch.emit();
  }

}
