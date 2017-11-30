import { AbstractControl, ValidatorFn } from '@angular/forms';

export function TypeValidator(type): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let test = control.value instanceof type;
    return !test ? {'invalidType': {value: control.value}} : null;
  };
}
