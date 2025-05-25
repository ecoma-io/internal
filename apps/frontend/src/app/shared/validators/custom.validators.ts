import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import * as zxcvbn from 'zxcvbn';

export class CustomValidators {
  static passwordStrength(minScore = 2): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      
      const result = zxcvbn(control.value);
      return result.score < minScore ? { weakPassword: true } : null;
    };
  }

  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      try {
        const phoneNumber = parsePhoneNumberFromString(control.value);
        return phoneNumber && phoneNumber.isValid() ? null : { invalidPhone: true };
      } catch {
        return { invalidPhone: true };
      }
    };
  }

  static username(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const valid = /^[a-zA-Z0-9]{3,20}$/.test(control.value);
      return valid ? null : { invalidUsername: true };
    };
  }
}