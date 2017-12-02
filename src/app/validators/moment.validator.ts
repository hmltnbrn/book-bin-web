import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function MomentValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let test = (moment(control.value).isValid() && !moment(control.value).isBefore(moment()) || !control.value);
    return !test ? {'invalidMoment': {value: control.value}} : null;
  };
}
