import { AbstractControl } from '@angular/forms';

export class BookTotalValidator {

  static CheckTotal(control: AbstractControl) {
    let numberOut = control.get('number_out').value;
    let total = control.get('total').value;
    if(numberOut > total) {
      control.get('total').setErrors({ checkTotal: true });
    } else {
      return null;
    }
  }

}
