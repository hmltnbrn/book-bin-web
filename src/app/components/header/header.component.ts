import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() username: string;

  @Output() toggleSide = new EventEmitter();
  @Output() closeSide = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleSideNav() {
    this.toggleSide.emit();
  }

  closeSideNav() {
    this.closeSide.emit();
  }


}
