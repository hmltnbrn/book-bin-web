import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  providers: [StorageService]
})
export class WrapperComponent implements OnInit {

  username: string;

  mobile: boolean = false;

  constructor(private storageService: StorageService) {
    this.username = this.storageService.getItem('username');
  }

  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth <= 768) {
      console.log("heres")
      this.mobile = true;
    }
  }

}
