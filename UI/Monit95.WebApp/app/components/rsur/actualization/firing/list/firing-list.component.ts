import { Component } from '@angular/core';
import { RsurParticipModel } from '../../../../../models/rsur-particip.model';
import { RsurParticipService } from '../../../../../services/rsur-particip.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { SchoolCollectorService } from '../../../../../shared/school-collector.service';

const COLLECTOR_ID = 2;

@Component({
	templateUrl: `./app/components/rsur/actualization/firing/list/firing-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/actualization/firing/list/firing-list.component.css?v=${new Date().getTime()}`]
})
export class FiringListComponent {
	isActualizing = true;
	isLoading = false;
	particips: RsurParticipModel[];

	constructor(private rsurParticipService: RsurParticipService,
		private schoolCollectorService: SchoolCollectorService,
		private dialog: MatDialog) { }

	ngOnInit() {
		this.schoolCollectorService.getCollectorState(COLLECTOR_ID).subscribe(state => {
			this.isActualizing = !state.IsFinished;
			if (this.isActualizing) {
				this.isLoading = true;
				this.rsurParticipService.getAll().subscribe(res => {
					this.particips = res.filter(f => f.ActualCode === 1 || f.ActualCode === 2);
					this.isLoading = false;
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
				const firedParticip: RsurParticipModel = { ...particip, ActualCode: 2 };
				this.rsurParticipService.update(particip.Code, firedParticip).subscribe(() => {
					const participIndex = this.particips.findIndex(prt => prt.Code === particip.Code);
					this.particips[participIndex].ActualCode = 2;
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
					const participIndex = this.particips.findIndex(prt => prt.Code === particip.Code);
					this.particips[participIndex].ActualCode = 1;
				});
			}
		});
	}

	endFiring() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вы уверены что хотите завершить этап 1?` }
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.schoolCollectorService.isFinished(COLLECTOR_ID, true).subscribe(() => this.isActualizing = false);
			}
		});
	}

	notEnded() {
		this.schoolCollectorService.isFinished(COLLECTOR_ID, false).subscribe(() => this.ngOnInit());
	}
}