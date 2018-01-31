import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { QuestionResult } from "../../../../models/marks-protocol.model";
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'marks-protocol',
	templateUrl: `./app/components/rsur/protocols/shared/marks-protocol.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/shared/marks-protocol.component.css?v=${new Date().getTime()}`]
})
export class MarksProtocolComponent implements AfterViewInit {
	inputElements: JQuery<HTMLInputElement>;

	@Input('questions') questionResults: QuestionResult[];

	@Output() onSend = new EventEmitter<QuestionResult[]>();
	@Output() onCancel = new EventEmitter();

	marksSending: boolean;

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		this.inputElements = $('.markInput') as JQuery<HTMLInputElement>;
		this.inputElements.focus((event) => event.target.select());

		if (this.inputElements.get(0)) {
			this.inputElements.get(0).focus();
			this.inputElements.get(0).setSelectionRange(0, this.inputElements.get(0).value.length);

			Observable.fromEvent(document.getElementsByClassName('markInput'), 'keyup')
				.filter((event: any) => [38, 40].indexOf(event.keyCode) > -1)
				.subscribe((event: any) => {
					if (event.keyCode === 40) {
						this.focusOnNextElement(event);
					} else if (event.keyCode === 38) {
						this.focusOnPrevElement(event);
					}
				});
		}

	}

	markChange(event: any, maxMark: number, step = 1) {
		const elem = event.target as HTMLInputElement;
		const elemIndex = this.inputElements.index(elem);
		const mark = Number.parseInt(elem.value);
		const possibleMarks = this.getPossibleMarks(maxMark, step);

		if (elem.value) {
			if (possibleMarks.indexOf(mark) > -1) {
				this.questionResults[elemIndex].CurrentMark = Number.parseInt(elem.value);
				this.focusOnNextElement(event);
			}
			else {
				elem.value = maxMark.toString();
				this.questionResults[elemIndex].CurrentMark = maxMark;
				this.focusOnNextElement(event);
			}
		}
	}

	getPossibleMarks(maxMark: number, step: number): number[] {
		let result: number[] = [];
		let current = 0;
		do {
			result.push(current);
			current += step;
		} while (current <= maxMark);
		return result;
	}

	focusOnNextElement(event: any) {
		const nextInputDiv = event.target.parentElement.nextElementSibling;
		if (nextInputDiv && nextInputDiv.className === 'form-inline') {
			nextInputDiv.children[1].focus();
		}
		else {
			$().ready(() => $('#submitBtn').focus()); // прежде чем перевести фокус на кнопку нужно чтобы ангулар успел сделать кнопку активной
		}
	}

	focusOnPrevElement(event: any) {
		const prevInputDiv = event.target.parentElement.previousElementSibling;
		if (prevInputDiv && prevInputDiv.className === 'form-inline') {
			prevInputDiv.children[1].focus();
		}
	}

	send() {
		this.marksSending = true;
		this.onSend.emit(this.questionResults);
	}

	cancel() {
		this.onCancel.emit();
	}
}