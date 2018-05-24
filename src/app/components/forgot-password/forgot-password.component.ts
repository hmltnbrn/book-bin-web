import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '@services/account.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [AccountService, StorageService]
})
export class ForgotPasswordComponent implements OnInit {

  isLoading: boolean = false;
  emailSent: boolean = false;

  emailForm: FormGroup;

  apiError: string;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])
    });
  }

  getErrorMessage(control: FormControl, field?: string) {
    if (control.hasError('required')) {
      return 'Please enter a value';
    }
    else if (control.hasError('pattern') && field == 'email') {
      return 'Please enter a valid email';
    }
    else {
      return '';
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.apiError = "";
    console.log(this.emailForm.value);
    this.accountService.ForgotPassword(this.emailForm.value).subscribe(
      data => {
        console.log(data);
        this.isLoading = false;
        this.emailSent = true;
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.apiError = error.error.message;
      });
  }

}
