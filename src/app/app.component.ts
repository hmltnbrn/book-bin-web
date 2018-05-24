import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthenticationService]
})
export class AppComponent {

  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe(event => {
      this.navigationInterceptor(event);
    });
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    if (!this.authService.getStaySignedIn()) {
      this.authService.signOff();
    }
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (event instanceof NavigationEnd) {
      this.isLoading = false;
      window.scrollTo(0, 0);
    }

    if (event instanceof NavigationCancel) {
      this.isLoading = false;
    }
    if (event instanceof NavigationError) {
      this.isLoading = false;
    }
  }

}
