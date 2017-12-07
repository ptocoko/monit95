import { Component, ViewChild, ElementRef } from '@angular/core';
import { RsurProtocolsService } from "../../../services/rsur-protocols.service";
import { Protocol } from "../../../models/protocol.model";

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
			$().ready(() => this.participCodeInput.nativeElement.focus());
		});
	}
}