import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ConfirmPasswordValidator {
    static validate(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceCtrl = control.get(source);
            const targetCtrl = control.get(target);

            if (sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value) {
                return { mismatch: true }
            }
            return null;
        };
    }
}