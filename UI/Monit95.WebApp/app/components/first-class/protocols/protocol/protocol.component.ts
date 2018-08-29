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
				this.focusOnInput(0);
			});
		});
	}
	
	enterKeyHandler(index: number, evt: any) {
		evt.preventDefault();
		const input = document.querySelector('#mark' + (index + 1)) as HTMLInputElement;
		const submitBtn = document.querySelector('#submitBtn') as HTMLButtonElement;
		
		input ? input.focus() : submitBtn.focus();
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


