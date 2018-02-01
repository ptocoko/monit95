import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParticipProtocolsService } from '../../../services/particip-protocols.service';
import { ParticipProtocolModel } from '../../../models/particip-protocol.model';
import { QuestionResult } from '../../../models/marks-protocol.model';
import { QuestionProtocolEdit } from '../../../models/question-protocol-edit.model';


@Component({
	templateUrl: `./app/particips/protocols/protocol/protocol.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/protocols/protocol/protocol.component.css?v=${new Date().getTime()}`]
})
export class ParticipProtocolComponent implements OnInit {
    isUpdate: boolean;
	participTestId: number;   
	protocol: QuestionProtocolEdit;

    constructor(
		private readonly location: Location,
		private readonly activatedRoute: ActivatedRoute,
		private readonly protocolsService: ParticipProtocolsService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
			this.participTestId = Number.parseInt(params['id']);
			this.protocolsService.getProtocol(this.participTestId).subscribe(res => {
				this.protocol = res;
			});
        });
    }

    submit(questionResults: QuestionResult[]) {
		this.protocolsService
				.postMarksProtocol(questionResults, this.participTestId)
				.subscribe(_ => this.back());
    }

    back() {
		this.location.back();
    }
}
