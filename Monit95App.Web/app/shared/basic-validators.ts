import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

export class BasicValidators {

    static email(control: FormControl) {
        const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        

        return EMAIL_REGEXP.test(control.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }

    static emailOrEmpty(control: FormControl) {        
        const EMAIL_OR_EMPTY_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|^$/;

        return EMAIL_OR_EMPTY_REGEXP.test(control.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
	}

	static textMinLengthWithoutSpaces(minLen: number): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			let text = control.value as string;
			return text.replace(/\s+/g, '').length < minLen ? { 'protocolText': { value: control.value } } : null;
		}
	}
}
