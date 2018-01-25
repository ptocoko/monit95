import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParticipProtocolsService } from '../../../services/particip-protocols.service';
import { ParticipProtocolModel } from '../../../models/particip-protocol.model';


@Component({
    templateUrl: `./app/particips/protocols/protocol/protocol.component.html?v=${new Date().getTime()}`
})
export class ParticipProtocolComponent implements OnInit {
    isUpdate: boolean;
	documNumber: number;   
	protocol: ParticipProtocolModel;

    constructor(
		private readonly location: Location,
		private readonly activatedRoute: ActivatedRoute,
		private readonly protocolsService: ParticipProtocolsService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.documNumber = params['documNumber'];
			this.protocolsService.getProtocol(this.documNumber).subscribe(res => {
				this.protocol = res;
			});
        });
    }

    submit() {
		this.protocolsService
				.postMarksProtocol(this.protocol.MarksProtocol, this.documNumber)
				.subscribe(res => this.back());
    }

    back() {
		this.location.back();
    }
}
