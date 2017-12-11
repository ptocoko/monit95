import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { MarksProtocol } from "../../../../models/marks-protocol.model";
import { Observable } from "rxjs/Observable";
import { FormGroup } from "@angular/forms";

@Component({
	selector: 'marks-protocol',
	templateUrl: `./app/components/rsur/protocols/protocol/marks-protocol.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/protocol/marks-protocol.component.css?v=${new Date().getTime()}`]
})
export class MarksProtocolComponent implements AfterViewInit {
	@ViewChild('marksForm.form') marksForm: FormGroup;
	inputElements: JQuery<HTMLInputElement>;

	@Input('protocol') marksProtocol: MarksProtocol;
	@Input() showParticipCode: boolean;

	@Output() onSend = new EventEmitter<MarksProtocol>();
	@Output() onCancel = new EventEmitter();

	errorMessage: string;

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		this.inputElements = $('.markInput') as JQuery<HTMLInputElement>;
		this.inputElements.focus((event) => event.target.select());
		this.inputElements.get(0).focus();
	}

	markChange(event: any) {
		let elem = event.target as HTMLInputElement;
		let elemIndex = this.inputElements.index(elem);

		if (elem.value) {
			if (elem.value.match(/^(1|0)$/)) {
				this.marksProtocol.QuestionResults[elemIndex].CurrentMark = Number.parseInt(elem.value);
				this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
			}
			else {
				elem.value = '1';
				this.marksProtocol.QuestionResults[elemIndex].CurrentMark = 1;
				this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
			}
		}
	}

	goToNextInputOrFocusOnSubmitBtn(elemIndex: number) {
		if (elemIndex < this.inputElements.length - 1) {
			let nextInput = this.inputElements.get(elemIndex + 1);
			if (!nextInput.value) {
				nextInput.focus();
			}
		}
		else {
			$('#submitBtn').focus();
		}
	}

	send() {
		this.onSend.emit(this.marksProtocol);
	}

	cancel() {
		this.onCancel.emit();
	}
}