import { Component } from '@angular/core';
import { ProtocolList } from '../../../models/one-two-three/protocol-list.model';
import { QuestionProtocolService } from '../../../services/one-two-three/question-protocols.service';

@Component({
	templateUrl: `./app/one-two-three/question-protocols/list/protocols-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/one-two-three/question-protocols/list/protocols-list.component.css?v=${new Date().getTime()}`]
})
export class ProtocolsListComponent {
	protocols: ProtocolList[] = [];

	constructor(private protocolService: QuestionProtocolService) { }

	ngOnInit() {
		this.protocolService.getAll().subscribe(res => this.protocols = res);
	}

	markAsAbsent(protocol: ProtocolList) {
		this.protocolService.markAsAbsent(protocol.ParticipTestId).subscribe(_ => {
			protocol.Marks = 'отсутствовал';
		});
	}
}