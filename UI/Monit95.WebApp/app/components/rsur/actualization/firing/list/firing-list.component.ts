import { Component } from '@angular/core';
import { RsurParticipModel } from '../../../../../models/rsur-particip.model';
import { RsurParticipService } from '../../../../../services/rsur-particip.service';
import { ActualizationService } from '../../../../../services/rsur/actualization.service';

@Component({
	templateUrl: `./app/components/rsur/actualization/firing/list/firing-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/actualization/firing/list/firing-list.component.css?v=${new Date().getTime()}`]
})
export class FiringListComponent {
	isActualizing: boolean;
	particips: RsurParticipModel[];

	constructor(private rsurParticipService: RsurParticipService,
				private actualizationService: ActualizationService) { }

	ngOnInit() {
		this.actualizationService.getActualizeStatus().subscribe(status => {
			this.isActualizing = status;
			if (status) {
				this.rsurParticipService.getAll().subscribe(res => {
					this.particips = res;
				});
			}
		});
	}

	fire(particip: RsurParticipModel) {
		const firedParticip: RsurParticipModel = { ...particip, ActualCode: 0 };
		this.rsurParticipService.update(particip.Code, firedParticip).subscribe(() => {
			this.particips.find(prt => prt.Code === particip.Code).ActualCode === 0;
		});
	}

	cancelFiring(particip: RsurParticipModel) {
		const firedParticip: RsurParticipModel = { ...particip, ActualCode: 1 };
		this.rsurParticipService.update(particip.Code, firedParticip).subscribe(() => {
			this.particips.find(prt => prt.Code === particip.Code).ActualCode === 1;
		});
	}

	endFiring() {
		this.actualizationService.endActualization().subscribe(() => this.isActualizing = false);
	}
}