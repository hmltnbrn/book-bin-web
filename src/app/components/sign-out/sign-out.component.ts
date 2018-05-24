import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
  providers: [AuthenticationService]
})
export class SignOutComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.signOff();
    this.route.queryParams.subscribe(params => {
      if (params.redirectFor) {
        this.router.navigate(['/signin'], { queryParams: { redirectFor: params.redirectFor } });
      }
      else {
        this.router.navigate(['/']);
      }
    });
  }

}
