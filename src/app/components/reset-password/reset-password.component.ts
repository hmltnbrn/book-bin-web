import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { PasswordValidation } from '../../validators/password-validation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [AccountService]
})
export class ResetPasswordComponent implements OnInit {

  isLoading: boolean = false;
  passwordReset: boolean = false;

  passwordForm: FormGroup;

  apiError: string;
  hide: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(!params.email || !params.token) this.router.navigate(['/']);
      this.createForm(params);
    });
  }

  createForm(params) {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}/)]),
      email: new FormControl(params.email || '', Validators.required),
      token: new FormControl(params.token || '', Validators.required)
    }, PasswordValidation.MatchPassword);
  }

  getErrorMessage(control: FormControl, field?: string) {
    if (control.hasError('required')) {
      return 'Please enter a value';
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
    this.isLoading = true;
    this.apiError = "";
    console.log(this.passwordForm.value);
    this.accountService.ResetPassword(this.passwordForm.value).subscribe(
      data => {
        this.isLoading = false;
        console.log(data);
        if (data['status'] == false) {
          this.apiError = data['message'];
        }
        else {
          this.passwordReset = true;
          console.log('Good');
        }
      },
      error => {
        console.log(error);
      });
  }

}
