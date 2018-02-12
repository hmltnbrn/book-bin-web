import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AccountService } from '@services/account.service';
import { MatchPasswordValidator } from '@validators/match-password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [AccountService]
})
export class ChangePasswordComponent implements OnInit {

  isLoading: boolean = false;
  isSuccess: boolean = false;

  passwordForm: FormGroup;

  apiError: string;
  hide: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}/)]),
      confirmPassword: new FormControl('', Validators.required)
    }, MatchPasswordValidator('newPassword','confirmPassword'));
  }

  getErrorMessage(control: FormControl, field?: string) {
    if (control.hasError('required')) {
      return 'Please enter a value';
    }
    else if (control.hasError('pattern')) {
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
    this.isLoading = true;
    this.isSuccess = false;
    this.apiError = "";
    console.log(this.passwordForm.value);
    this.accountService.ChangePassword(this.passwordForm.value).subscribe(
      data => {
        console.log(data);
        this.isLoading = false;
        this.isSuccess = true;
        this.resetForm();
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.apiError = error.error.message;
      });
  }

  resetForm() {
    this.passwordForm.reset();
  }

}
