import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '@services/account.service';
import { StorageService } from '@services/storage.service';
import { MatchPasswordValidator } from '@validators/match-password.validator';
import { Titles } from '@global/titles.global';
import { Grades } from '@global/grades.global';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AccountService, StorageService, Titles, Grades]
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  hide: boolean = true;

  apiError: string;
  signedUp: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private accountService: AccountService, private storageService: StorageService, private titles: Titles, private grades: Grades) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}/)]),
      title: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,63})+$/)]),
      grade: new FormControl('', Validators.required),
      schoolName: new FormControl('', Validators.required),
      zip: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
      role: new FormControl(2)
    }, MatchPasswordValidator('password','confirmPassword'));
  }

  getErrorMessage(control: FormControl, field?: string) {
    if (control.hasError('required')) {
      return 'Please enter a value';
    }
    else if (control.hasError('pattern') && field == 'email') {
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
      this.isLoading = false;
      this.signedUp = true;
    },
    error => {
      console.log(error);
      this.isLoading = false;
      this.apiError = error.error.message;
    });
  }

}
