import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StorageService]
})
export class AppComponent {

  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService) {
    this.router.events.subscribe(event => {
      this.navigationInterceptor(event);
    });
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    if(this.storageService.getItem('staySignedIn') == 'false') {
      this.storageService.removeItem('token');
      this.storageService.removeItem('username');
      this.storageService.removeItem('staySignedIn');
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
