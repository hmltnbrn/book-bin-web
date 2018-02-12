import { AbstractControl, ValidatorFn } from '@angular/forms';

export function MatchPasswordValidator(firstPassword, secondPassword): ValidatorFn {
  return (control: AbstractControl) => {
    let password = control.get(firstPassword).value;
    let confirmPassword = control.get(secondPassword).value;
    if (password != confirmPassword) {
      control.get(secondPassword).setErrors({ matchPassword: true });
    } else {
      return null;
    }
  };
}
