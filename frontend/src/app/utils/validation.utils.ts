import { AbstractControl, ValidatorFn } from '@angular/forms';

export function conditionalValidator(
  predicate: () => boolean,
  validator: ValidatorFn | null,
) {
  return (formControl: AbstractControl) => {
    if (!formControl.parent) {
      return null;
    }
    if (validator && predicate()) {
      return validator(formControl);
    }
    return null;
  };
}
