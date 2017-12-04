import { Component } from '@angular/core';
import { RsurProtocolsService } from "../../../services/rsur-protocols.service";

@Component({
	templateUrl: `./app/components/rsur/protocols/marks-protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/marks-protocols.component.css?v=${new Date().getTime()}`]
})
export class MarksProtocolsComponent {
	participProtocols: ParticipScanModel[];

	constructor(private rsurProtocolsService: RsurProtocolsService) { }

	ngOnInit() {
		this.rsurProtocolsService.getParticipProtocols().subscribe(res => this.participProtocols = res);
	}

	deleteResult(protocol: ParticipScanModel) {
		this.rsurProtocolsService.deleteTestResult(protocol.ParticipTestId).subscribe(res => {
			protocol.SourceFileName = undefined;
			protocol.Marks = undefined;
		});
	}
}

export interface ParticipScanModel {
	ParticipCode: number;
	ParticipTestId: number;
	TestName: string;
	SourceFileName?: string;
	Marks?: string;
}