import { Component } from '@angular/core';
import { ProtocolsService } from '../../../../services/first-class/protocols.service';
import { ProtocolPostModel } from '../../../../models/first-class/protocol-post.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	templateUrl: `./app/components/first-class/protocols/protocol/protocol.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/first-class/protocols/protocol/protocol.component.css?v=${new Date().getTime()}`]
})
export class ProtocolComponent {
	protocol: ProtocolPostModel;
	participTestId: number;
	marksSending = false;
	validateMsg: string;

	constructor(private protocolService: ProtocolsService,
		private route: ActivatedRoute,
		private location: Location) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.participTestId = params['participTestId'];
			this.protocolService.get(this.participTestId).subscribe(protocol => {
				this.protocol = protocol;
				this.focusOnInput(0);
			});
		});
	}
	
	enterHandler(index: number, evt: any) {
		evt.preventDefault();
		const input = document.querySelector('#mark' + (index + 1)) as HTMLInputElement;
		const submitBtn = document.querySelector('#submitBtn') as HTMLButtonElement;
		
		input ? input.focus() : submitBtn.focus();
	}

	send() {
		this.marksSending = true;
		if (this.checkMarks()) {
			this.protocolService.edit(this.participTestId, this.protocol).subscribe(_ => {
				this.marksSending = false;
				this.location.back();
			});
		}
	}

	cancel() { this.location.back(); }

	private focusOnInput(index: number) {
		setTimeout(() => {
			const firstInput = document.querySelector('#mark' + index) as HTMLInputElement;
			firstInput && firstInput.focus();
		}, 0);
	}

	private checkMarks(): boolean {
		let resBool = true;
		for (let i = 0; i < this.protocol.QuestionResultsList.length; i++) {
			const question = this.protocol.QuestionResultsList[i];
			const possibleMark = this.getPossibleMarks(question.MaxMark, question.Step);
			resBool = possibleMark.indexOf(question.CurrentMark) > -1;

			if (!resBool) {
				this.marksSending = false;
				this.focusOnInput(i);
				this.setValidMsg(question.Name);
				return resBool;
			}
		}

		return resBool;
	}

	private getPossibleMarks(maxMark: number, step: number): number[] {
		const resArr = [];
		for (let i = 0; i <= maxMark; i += step) {
			resArr.push(i);
		}

		return resArr;
	}

	private setValidMsg(questionName: string) {
		this.validateMsg = `Неправильная оценка за задание «${questionName}»`;
	}
}