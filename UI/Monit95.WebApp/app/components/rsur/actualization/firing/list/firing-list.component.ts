import { Component } from '@angular/core';
import { RsurParticipModel } from '../../../../../models/rsur-particip.model';
import { RsurParticipService } from '../../../../../services/rsur-particip.service';
import { ActualizationService } from '../../../../../services/rsur/actualization.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
	templateUrl: `./app/components/rsur/actualization/firing/list/firing-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/actualization/firing/list/firing-list.component.css?v=${new Date().getTime()}`]
})
export class FiringListComponent {
	isActualizing: boolean;
	particips: RsurParticipModel[];

	constructor(private rsurParticipService: RsurParticipService,
		private actualizationService: ActualizationService,
		private dialog: MatDialog) { }

	ngOnInit() {
		this.actualizationService.getActualizeStatus().subscribe(status => {
			this.isActualizing = !status.IsFinished;
			if (status) {
				this.rsurParticipService.getAll().subscribe(res => {
					this.particips = res;
				});
			}
		});
	}

	fire(particip: RsurParticipModel) {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вы уверены что хотите исключить участника '${particip.SchoolParticipInfo.Surname} ${particip.SchoolParticipInfo.Name} ${particip.SchoolParticipInfo.SecondName}' из диагностики?` }
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				const firedParticip: RsurParticipModel = { ...particip, ActualCode: 0 };
				this.rsurParticipService.update(particip.Code, firedParticip).subscribe(() => {
					this.particips.find(prt => prt.Code === particip.Code).ActualCode === 0;
				});
			}
		});
	}

	cancelFiring(particip: RsurParticipModel) {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вы уверены что хотите включить участника '${particip.SchoolParticipInfo.Surname} ${particip.SchoolParticipInfo.Name} ${particip.SchoolParticipInfo.SecondName}' в диагностику?` }
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				const firedParticip: RsurParticipModel = { ...particip, ActualCode: 1 };
				this.rsurParticipService.update(particip.Code, firedParticip).subscribe(() => {
					this.particips.find(prt => prt.Code === particip.Code).ActualCode === 1;
				});
			}
		});
	}

	endFiring() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вы уверены что хотите завершить этап 1? (это действие нельзя отменить)` }
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.actualizationService.endActualization().subscribe(() => this.isActualizing = false);
			}
		});
	}
}