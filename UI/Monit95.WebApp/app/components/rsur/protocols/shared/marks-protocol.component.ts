import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { QuestionResult } from "../../../../models/marks-protocol.model";
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter } from 'rxjs/operators/filter';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'marks-protocol',
	templateUrl: `./app/components/rsur/protocols/shared/marks-protocol.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/shared/marks-protocol.component.css?v=${new Date().getTime()}`]
})
export class MarksProtocolComponent implements AfterViewInit, OnDestroy {
	@Input('questions') questionResults: QuestionResult[];
	@Input() hasOptionNumber: boolean;
	@Input() optionNumber: number;
	@Input() showPossibleMarks: boolean;

	@Output() onSend = new EventEmitter<QuestionResult[]>();
	@Output() onCancel = new EventEmitter();
	@Output() optionNumberChange = new EventEmitter<number>();
	
	inputElements: JQuery<HTMLInputElement>;
	marksSending: boolean;
	keyUpSub$: Subscription;

	ngAfterViewInit(): void {
		this.inputElements = $('.markInput') as JQuery<HTMLInputElement>;
		this.inputElements.focus((event) => event.target.select());

		if (this.inputElements.get(0)) {
			this.inputElements.get(0).focus();
			this.inputElements.get(0).setSelectionRange(0, this.inputElements.get(0).value.length);

			this.keyUpSub$ = fromEvent(document.getElementsByClassName('markInput'), 'keyup')
				.pipe(
					filter((event: any) => [38, 40].indexOf(event.keyCode) > -1)
				)
				.subscribe((event: any) => {
					if (event.keyCode === 40) {
						this.focusOnNextElement(event);
					} else if (event.keyCode === 38) {
						this.focusOnPrevElement(event);
					}
				});
		}

	}

	onOptionNumberChange(event: any) {
		this.optionNumberChange.emit(this.optionNumber);
		this.focusOnNextElement(event);
	}

	markChange(event: any, maxMark: number, step = 1) {
		const elem = event.target as HTMLInputElement;

		if (elem.value.length >= maxMark.toString().length) {
			let elemIndex = this.inputElements.index(elem);
			if (this.hasOptionNumber) {
				elemIndex--;
			}
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
		if (nextInputDiv && nextInputDiv.className.includes('form-inline')) {
			nextInputDiv.children[1].focus();
		}
		else {
			$().ready(() => $('#submitBtn').focus()); // прежде чем перевести фокус на кнопку нужно чтобы ангулар успел сделать кнопку активной
		}
	}

	focusOnPrevElement(event: any) {
		const prevInputDiv = event.target.parentElement.previousElementSibling;
		if (prevInputDiv && prevInputDiv.className.includes('form-inline')) {
			prevInputDiv.children[1].focus();
		}
	}

	isFocused(elemSelector: string): boolean {
		const elem = document.getElementById(elemSelector);
		return elem === document.activeElement;
	}

	send() {
		this.marksSending = true;
		this.onSend.emit(this.questionResults);
	}

	cancel() {
		this.onCancel.emit();
	}

	ngOnDestroy() {
		if (this.keyUpSub$)
			this.keyUpSub$.unsubscribe();
	}
}

function convertToInput(elem: Element): HTMLInputElement {
	const inputElem = elem as HTMLInputElement;
	return inputElem;
}