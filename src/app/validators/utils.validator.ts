import {AbstractControl} from '@angular/forms';

export function NumeroMayorCero(control: AbstractControl) {
  if (control.value > 0) {
    return {valid: true};
  }
  return null;
}

export function NumeroMenorCero(control: AbstractControl) {
  if (control.value < 0) {
    return {valid: true};
  }
  return null;
}
