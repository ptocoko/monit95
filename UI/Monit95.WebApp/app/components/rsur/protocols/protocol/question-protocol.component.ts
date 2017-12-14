import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MarksProtocol } from '../../../../models/marks-protocol.model';
import { RsurProtocolsService } from '../../../../services/rsur-protocols.service';

@Component({
	templateUrl: `./app/components/rsur/protocols/protocol/question-protocol.component.html?v=${new Date().getTime()}`
})
export class QuestionProtocolComponent {
	marksProtocol: MarksProtocol;

	constructor(private rsurProtocolService: RsurProtocolsService,
				private route: ActivatedRoute,
				private location: Location) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			let participCode = params['participCode'];

			this.rsurProtocolService.getMarksProtocol(participCode).subscribe(marksProtocol => {
				this.marksProtocol = marksProtocol;
			})
		});
	}

	send(marksProtocol: MarksProtocol) {
		this.rsurProtocolService.postMarksProtocol(marksProtocol).subscribe(response => this.location.back());
	}

	cancel() {
		this.location.back();
	}
}