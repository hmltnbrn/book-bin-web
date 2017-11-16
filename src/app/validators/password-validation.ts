import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('confirmPassword').value;
    if(password != confirmPassword) {
      control.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      return null;
    }
  }

}
