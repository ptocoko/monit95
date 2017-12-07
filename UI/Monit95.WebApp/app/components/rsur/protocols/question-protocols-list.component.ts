import { Component, ViewChild, ElementRef } from '@angular/core';
import { RsurProtocolsService } from "../../../services/rsur-protocols.service";
import { Protocol } from "../../../models/protocol.model";
import { Observable } from "rxjs/Observable";

@Component({
	templateUrl: `./app/components/rsur/protocols/question-protocols-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/question-protocols-list.component.css?v=${new Date().getTime()}`]
})
export class QuestionProtocolsList {
	questionProtocols: Protocol[];
	processedProtocols = () => this.questionProtocols.filter(f => f.Marks).length;
	notProcessedProtocols = () => this.questionProtocols.filter(f => !f.Marks).length;

	@ViewChild('participCodeInput') participCodeInput: ElementRef;

	constructor(private rsurProtocolsService: RsurProtocolsService) { }

	ngOnInit() {
		this.rsurProtocolsService.getQuestionProtocols().subscribe(questionProtocols => {
			this.questionProtocols = questionProtocols;
			$().ready(() => {
				this.participCodeInput.nativeElement.focus();
				Observable.fromEvent(this.participCodeInput.nativeElement, 'keyup')
					.filter((event: any) => event.keyCode === 13 && this.filteredByParticipCode(event.target.value).length === 1)
					.subscribe(event => alert(this.filteredByParticipCode(event.target.value)[0].ParticipCode));
			});
		});
	}

	filteredByParticipCode(value: string) {
		return this.questionProtocols.filter(f => f.ParticipCode.toString().indexOf(value) > -1);
	}
}