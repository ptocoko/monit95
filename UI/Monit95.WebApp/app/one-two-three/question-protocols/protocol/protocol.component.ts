import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionProtocol } from '../../../models/one-two-three/question-protocol.model';
import { QuestionProtocolService } from '../../../services/one-two-three/question-protocols.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionResult } from '../../../models/marks-protocol.model';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './protocol.component.html',
})
export class ProtocolComponent implements OnInit, OnDestroy {
	protocol: QuestionProtocol;
	participTestId: number;
	protocolSub$: Subscription;

	constructor(
		private readonly location: Location,
		private readonly activatedRoute: ActivatedRoute,
		private readonly protocolService: QuestionProtocolService) { }

	ngOnInit() {
		this.protocolSub$ = this.activatedRoute
			.params
			.pipe(
				switchMap(params => {
					this.participTestId = Number.parseInt(params['participTestId']);
					return this.protocolService.get(this.participTestId);
				})
			)
			.subscribe(res => this.protocol = res);
	}

	submit(questionResults: QuestionResult[]) {
		this.protocol.QuestionMarks = questionResults;

		this.protocolService
			.editMarks(this.participTestId, this.protocol)
			.subscribe(() => this.back());
		//console.log(this.protocol);
	}

	back() {
		this.location.back();
	}

	ngOnDestroy() {
		if (this.protocolSub$)
			this.protocolSub$.unsubscribe();
	}
}