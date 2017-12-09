import { AbstractControl } from '@angular/forms';

export class BookTotalValidator {

  static CheckTotal(control: AbstractControl) {
    let numberOut = control.get('number_out').value;
    let total = control.get('total').value;
    if (total <= 0) {
      control.get('total').setErrors({ zeroTotal: true });
    }
    else if(numberOut > total) {
      control.get('total').setErrors({ lowTotal: true });
    }
    else {
      return null;
    }
  }

}
