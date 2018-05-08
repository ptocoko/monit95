import { Component } from '@angular/core';
import { QuestionProtocol } from '../../../models/one-two-three/question-protocol.model';
import { QuestionProtocolService } from '../../../services/one-two-three/question-protocols.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionResult } from '../../../models/marks-protocol.model';
import { Location } from '@angular/common';

@Component({
	templateUrl: `./app/one-two-three/question-protocols/protocol/protocol.component.html?v=${new Date().getTime()}`
})
export class ProtocolComponent {
	protocol: QuestionProtocol;
	participTestId: number;

	constructor(
		private readonly location: Location,
		private readonly activatedRoute: ActivatedRoute,
		private readonly protocolService: QuestionProtocolService) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.participTestId = Number.parseInt(params['participTestId']);

			this.protocolService.get(this.participTestId).subscribe(res => {
				this.protocol = res;
			});
		});
	}

	submit(questionResults: QuestionResult[]) {
		this.protocolService.editMarks(this.participTestId, questionResults).subscribe(() => this.back());
	}

	back() {
		this.location.back();
	}
}