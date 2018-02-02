import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ParticipProtocolsService } from '../../services/particip-protocols.service';
import { Observable } from 'rxjs/Observable';
import { QuestionProtocolRead } from '../../models/question-protocol-read.model';

const PROJECT_TEST_ID: number = 1;

@Component({
	templateUrl: `./app/particips/protocols/protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/protocols/protocols.component.css?v=${new Date().getTime()}`]
})
export class ProtocolsComponent {
	AbsentText = 'отсутствовал';
	protocols: QuestionProtocolRead[];

	// вычисление статистики
	processedProtocols = () => this.protocols.filter(f => f.QuestionMarks).length;
	notProcessedProtocols = () => this.protocols.filter(f => !f.QuestionMarks).length;

	constructor(private participProtocolsService: ParticipProtocolsService,
				private router: Router) { }

	ngOnInit() {
	    this.participProtocolsService.getProtocolsList().subscribe(res => {
			this.protocols = res;
	    });
	}
	

	changeMarks(participTestId: number) {
		this.router.navigate(['/particips/protocol', participTestId]);
	}

	markAsAbsent(protocol: QuestionProtocolRead) {
		this.participProtocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(_ => {
			protocol.QuestionMarks = this.AbsentText;
		});
	}
}