import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '@services/account.service';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [AccountService, AuthenticationService]
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  hide: boolean = true;

  apiError: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.redirectFor) {
        this.apiError = params.redirectFor;
      }
    });
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      staySignedIn: new FormControl(true)
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
        this.onSuccess(data);
      },
      error => {
        console.log(error);
        this.onError(error);
      });
  }

  onSuccess(data) {
    this.authService.setUserAuthentication(data['id'], this.signInForm.value.username, data['token'], this.signInForm.value.staySignedIn);
    this.router.navigate(['/library/dashboard']);
  }

  onError(error) {
    this.apiError = error.error.message;
  }

}
