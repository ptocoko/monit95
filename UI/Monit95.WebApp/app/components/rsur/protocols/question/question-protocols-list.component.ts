import { Component, ViewChild, ElementRef } from '@angular/core';
import { RsurProtocolsService } from '../../../../services/rsur-protocols.service';
import { Protocol } from '../../../../models/protocol.model';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter } from 'rxjs/operators/filter';


@Component({
	templateUrl: `./app/components/rsur/protocols/question/question-protocols-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/question/question-protocols-list.component.css?v=${new Date().getTime()}`]
})
export class QuestionProtocolsList {
	questionProtocols: Protocol[] = new Array<Protocol>();
	processedProtocols = () => this.questionProtocols.filter(f => f.RsurQuestionValues).length;
	notProcessedProtocols = () => this.questionProtocols.filter(f => !f.RsurQuestionValues).length;

	limitToVal = 20;
	pageIndex = 0;

	@ViewChild('participCodeInput') participCodeInput: ElementRef;

	constructor(private rsurProtocolsService: RsurProtocolsService,
				private router: Router) { }

	ngAfterViewInit() {
		this.rsurProtocolsService.getQuestionProtocols().subscribe(questionProtocols => {
			this.questionProtocols = questionProtocols;
			this.initCodeListener();
		});
	}

	private initCodeListener() {
		this.participCodeInput.nativeElement.focus();
		let codeInput$ = fromEvent(this.participCodeInput.nativeElement, 'keyup');

		codeInput$.subscribe(() => this.pageIndex = 0);

		codeInput$.pipe(filter((event: any) => event.keyCode === 13 && this.checkIfOnlyOneMatch(event.target.value)))
			.subscribe(event => this.changeMarks(this.getProtocol(event.target.value).ParticipCode));
	}

	changeMarks(participCode: number) {
		this.router.navigate(['/rsur/question-protocol', participCode]);
	}

	checkIfOnlyOneMatch(participCode: string) {
		return this.questionProtocols.filter(f => f.ParticipCode.toString().indexOf(participCode) > -1).length === 1;
	}

	getProtocol(participCode: string): Protocol {
		return this.questionProtocols.find(f => f.ParticipCode.toString().indexOf(participCode) > -1);
	}

	markAsAbsent(questionProtocol: Protocol) {
		this.rsurProtocolsService.markAsAbsent(questionProtocol.ParticipTestId)
			.subscribe(res => questionProtocol.RsurQuestionValues = 'отсутствовал');
	}
}