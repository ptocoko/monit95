import { Component, ViewChild } from '@angular/core';
import { ProtocolsService } from '../../../../services/first-class/protocols.service';
import { ProtocolPostModel } from '../../../../models/first-class/protocol-post.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { QuestionResultModel } from '../../../../models/first-class/question-result.model';

@Component({
	templateUrl: `./app/components/first-class/protocols/protocol/protocol.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/first-class/protocols/protocol/protocol.component.css?v=${new Date().getTime()}`]
})
export class ProtocolComponent {
	protocol: ProtocolPostModel;
	participTestId: number;
	marksSending = false;
	validateMsg: string;
	@ViewChild('marksForm') marksForm: NgForm;

	constructor(private protocolService: ProtocolsService,
		private route: ActivatedRoute,
		private location: Location) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.participTestId = params['participTestId'];
			this.protocolService.get(this.participTestId).subscribe(protocol => {
				this.protocol = protocol;
				this.focusById('submark0');
			});
		});
	}
	
	enterKeyHandler(index: number, evt: any) {
		evt.preventDefault();
		const input = document.querySelector('#mark' + (index + 1)) as HTMLInputElement;
		const submitBtn = document.querySelector('#submitBtn') as HTMLButtonElement;
		
		input ? input.focus() : submitBtn.focus();
	}

	applyMarkAndFocusNextEl(val: string, markDto: QuestionResultModel, nextId: string, isFirstChanged: boolean, isSecondChanged: boolean) {
		if (val === '' || val.length !== markDto.MaxMark.toString().length) {
			this.recalcSums(isFirstChanged, isSecondChanged);
			return;
		}

		let currentVal = +val;
		if (isNaN(currentVal) || currentVal > markDto.MaxMark || currentVal < 0) {
			currentVal = markDto.MaxMark;
		}

		markDto.CurrentMark = currentVal;

		this.recalcSums(isFirstChanged, isSecondChanged);

		this.focusById(nextId);
	}

	recalcSums(isFirstChanged: boolean, isSecondChanged: boolean) {
		if (this.protocol.SubQuestionResults.slice(0, 6).every(q => q.CurrentMark === 0 ? true : !!q.CurrentMark) && isFirstChanged) {
			const first = Math.max(this.protocol.SubQuestionResults[0].CurrentMark, this.protocol.SubQuestionResults[1].CurrentMark, this.protocol.SubQuestionResults[2].CurrentMark) +
				Math.min(this.protocol.SubQuestionResults[0].CurrentMark, this.protocol.SubQuestionResults[1].CurrentMark, this.protocol.SubQuestionResults[2].CurrentMark);

			const second = Math.max(this.protocol.SubQuestionResults[3].CurrentMark, this.protocol.SubQuestionResults[4].CurrentMark, this.protocol.SubQuestionResults[5].CurrentMark) +
				Math.min(this.protocol.SubQuestionResults[3].CurrentMark, this.protocol.SubQuestionResults[4].CurrentMark, this.protocol.SubQuestionResults[5].CurrentMark);

			this.protocol.QuestionResultsList[0].CurrentMark = first + second;
		} else if (isFirstChanged) {
			this.protocol.QuestionResultsList[0].CurrentMark = null;
		}

		if (this.protocol.SubQuestionResults.slice(6, 12).every(q => q.CurrentMark === 0 ? true : !!q.CurrentMark) && isSecondChanged) {
			this.protocol.QuestionResultsList[2].CurrentMark = this.protocol.SubQuestionResults.slice(6, 12).map(q => q.CurrentMark).reduce((prev, curr) => prev += curr, 0);
		} else if (isSecondChanged) {
			this.protocol.QuestionResultsList[2].CurrentMark = null;
		}
	}

	focusById(id: string) {
		setTimeout(() => {
			const el = document.getElementById(id) as HTMLInputElement;
			el.focus();
			el.select && el.select();
		}, 0);
	}

	send() {
		if (this.marksForm.valid) {
			this.marksSending = true;
			this.protocolService.edit(this.participTestId, this.protocol).subscribe(_ => {
				this.marksSending = false;
				this.location.back();
			});
		} else {
			for (let propName of Object.getOwnPropertyNames(this.marksForm.controls)) {
				if (this.marksForm.controls[propName].invalid) {
					this.focusOnInput(Number.parseInt(propName.slice(-1)));
					break;
				}
			}
		}
	}

	cancel() { this.location.back(); }

	private focusOnInput(index: number) {
		setTimeout(() => {
			const firstInput = document.querySelector('#mark' + index) as HTMLInputElement;
			firstInput && firstInput.focus();
		}, 0);
	}
}


