import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { QuestionResultModel } from '../models/first-class/question-result.model';

@Directive({
	selector: '[appMark]',
	providers: [{ provide: NG_VALIDATORS, useExisting: MarkValidateDirective, multi: true }]
})
export class MarkValidateDirective implements Validator {
	@Input('appMark') question: QuestionResultModel;

	validate(control: AbstractControl): { [key: string]: any } | any {
		return this.question && control.value ? markValidator(this.question)(control) : null;
	}
}

function getPossibleMarks(maxMark: number, step: number): number[] {
	const resArr = [];
	for (let i = 0; i <= maxMark; i += step) {
		resArr.push(i);
	}

	return resArr;
}

function markValidator(question: QuestionResultModel): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const possibleMarks = getPossibleMarks(question.MaxMark, question.Step);
		return possibleMarks.indexOf(question.CurrentMark) > -1 ? null :
			{
				'markValidate': {
					value: `Оценка за задание "${question.Name}" должна быть в диапазоне от «0» до «${question.MaxMark}»`
				}
			};
	}
}