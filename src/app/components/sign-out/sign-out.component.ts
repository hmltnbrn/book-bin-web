import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
  providers: [StorageService]
})
export class SignOutComponent {

  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService) {
    this.storageService.removeItem('id');
    this.storageService.removeItem('username');
    this.storageService.removeItem('token');
    this.storageService.removeItem('staySignedIn');
    this.route.queryParams.subscribe(params => {
      if (params.redirectFor && params.redirectFor == 'denied') {
        this.router.navigate(['/signin'], { queryParams: { redirectFor: 'denied' } });
      }
      else if (params.redirectFor && params.redirectFor == 'expired') {
        this.router.navigate(['/signin'], { queryParams: { redirectFor: 'expired' } });
      }
      else {
        this.router.navigate(['/']);
      }
    });
  }

}
