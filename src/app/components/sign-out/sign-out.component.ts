import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
  providers: [StorageService]
})
export class SignOutComponent {

  constructor(private router: Router, private storageService: StorageService) {
    this.storageService.removeItem('id');
    this.storageService.removeItem('username');
    this.storageService.removeItem('token');
    this.storageService.removeItem('staySignedIn');
    this.router.navigate(['/']);
  }

}
