import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { StorageService } from '../../services/storage.service';
import { PasswordValidation } from '../../validators/password-validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AccountService, StorageService]
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  hide: boolean = true;

  apiError: string;
  isLoading: boolean = false;

  constructor(private router: Router, private accountService: AccountService, private storageService: StorageService) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}/)]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      zip: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
      schoolName: new FormControl('', Validators.required)
    }, PasswordValidation.MatchPassword);
  }

  ngOnInit() {

  }

  getErrorMessage(control: FormControl, field?: string) {
    if (control.hasError('required')) {
      return 'Please enter a value';
    }
    else if (control.hasError('email')) {
      return 'Please enter a valid email';
    }
    else if (control.hasError('pattern') && field == 'zip') {
      return 'Please enter a valid zip code';
    }
    else if (control.hasError('pattern') && field == 'password') {
      return 'Must contain a number, capital letter, special character, and be at least 8 characters';
    }
    else if (control.hasError('matchPassword')) {
      return 'Passwords do not match';
    }
    else {
      return '';
    }
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.apiError = "";
    this.isLoading = true;
    this.accountService.Register(this.signUpForm.value).subscribe(
    data => {
      console.log(data);
      if (data["status"] == true) {
        this.accountService.SignIn({ username: this.signUpForm.value.username, password: this.signUpForm.value.password }).subscribe(
          data => {
            this.storageService.setItem('id', data['id']);
            this.storageService.setItem('username', this.signUpForm.value.username);
            this.storageService.setItem('token', data['token']);
            this.storageService.setItem('staySignedIn', false);
            this.router.navigate(['/library/dashboard']);
          },
          error => {
            console.log(error);
          });
      }
      else {
        this.isLoading = false;
        this.apiError = data["message"];
      }
    },
    error => {
      console.log(error);
    });
  }

}
