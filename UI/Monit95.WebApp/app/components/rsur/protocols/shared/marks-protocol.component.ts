import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { MarksProtocol } from "../../../../models/marks-protocol.model";
import { Observable } from "rxjs/Observable";
import { FormGroup, NgForm } from "@angular/forms";

@Component({
	selector: 'marks-protocol',
	templateUrl: `./app/components/rsur/protocols/shared/marks-protocol.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/shared/marks-protocol.component.css?v=${new Date().getTime()}`]
})
export class MarksProtocolComponent implements AfterViewInit {
	@ViewChild('marksForm') marksForm: NgForm;
	inputElements: JQuery<HTMLInputElement>;

	@Input('protocol') marksProtocol: MarksProtocol;
	@Input() showParticipCode: boolean;

	@Output() onSend = new EventEmitter<MarksProtocol>();
	@Output() onCancel = new EventEmitter();

	marksSending: boolean;

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		this.inputElements = $('.markInput') as JQuery<HTMLInputElement>;
		this.inputElements.focus((event) => event.target.select());

		this.inputElements.get(0).focus();
		//this.inputElements.get(0).select();
	}

	markChange(event: any, maxMark: number, step = 1) {
		const elem = event.target as HTMLInputElement;
		const elemIndex = this.inputElements.index(elem);
		const mark = Number.parseInt(elem.value);
		const possibleMarks = this.getPossibleMarks(maxMark, step);

		if (elem.value) {
			if (possibleMarks.indexOf(mark) > -1) {
				this.marksProtocol.QuestionResults[elemIndex].CurrentMark = Number.parseInt(elem.value);
				this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
			}
			else {
				elem.value = maxMark.toString();
				this.marksProtocol.QuestionResults[elemIndex].CurrentMark = maxMark;
				this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
			}
		}
	}

	getPossibleMarks(maxMark: number, step: number): number[] {
		let result: number[];
		let current = 0;
		do {
			result.push(current);
			current += step;
		} while (current <= maxMark);
		return result;
	}

	goToNextInputOrFocusOnSubmitBtn(elemIndex: number) {
		if (elemIndex < this.inputElements.length - 1) {
			let nextInput = this.inputElements.get(elemIndex + 1);
			if (!nextInput.value) {
				nextInput.focus();
			}
		}
		else {
			$().ready(() => $('#submitBtn').focus());
		}
	}

	send() {
		this.marksSending = true;
		this.onSend.emit(this.marksProtocol);
	}

	cancel() {
		this.onCancel.emit();
	}
}