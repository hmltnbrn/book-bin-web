import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [AccountService, StorageService]
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  hide: boolean = true;

  apiError: string;

  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService, private storageService: StorageService) {
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      staySignedIn: new FormControl(true)
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.redirectFor && params.redirectFor == 'expired') {
        this.apiError = "Your session expired";
      }
      if (params.redirectFor && params.redirectFor == 'denied') {
        this.apiError = "Access denied";
      }
    });
  }

  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? 'You must enter a value' : '';
  }

  onSubmit() {
    this.apiError = "";
    console.log(this.signInForm.value);
    this.accountService.SignIn(this.signInForm.value).subscribe(
      data => {
        console.log(data);
        if (data['status'] == false) {
          this.apiError = data['message'];
        }
        else {
          this.storageService.setItem('id', data['id']);
          this.storageService.setItem('username', this.signInForm.value.username);
          this.storageService.setItem('token', data['token']);
          this.storageService.setItem('staySignedIn', this.signInForm.value.staySignedIn);
          this.router.navigate(['/library/dashboard']);
        }
        
      },
      error => {
        console.log(error);
      });
  }

}
