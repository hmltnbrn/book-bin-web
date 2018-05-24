import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  providers: [AuthenticationService]
})
export class WrapperComponent implements OnInit {

  username: string;

  mobile: boolean = false;

  constructor(
    private authService: AuthenticationService
  ) {
    this.username = this.authService.getUsername();
  }

  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth <= 768) {
      console.log("heres")
      this.mobile = true;
    }
  }

}
