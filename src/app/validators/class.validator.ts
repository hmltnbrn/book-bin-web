import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ClassValidator(inputClass): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let test = control.value instanceof inputClass;
    return !test ? {'invalidClass': {value: control.value}} : null;
  };
}
