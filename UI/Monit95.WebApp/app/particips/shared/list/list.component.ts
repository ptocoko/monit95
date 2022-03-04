import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ParticipModel } from '../../../models/particip.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ParticipService } from '../../../services/particip.service';
import { SchoolCollectorService } from '../../../shared/school-collector.service';

@Component({
	selector: 'table-list',
	templateUrl: `./app/particips/shared/list/list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/shared/list/list.component.css?v=${new Date().getTime()}`]
})
export class ListComponent {
	displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'SourceName', 'del-action'];
	columnsWhenFinished = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'SourceName'];
	participsCount = 0;
	dataSource = new MatTableDataSource<ParticipModel>();
	isFinished: boolean;

	@Input() particips: ParticipModel[];
	@Input() addParticipRouterLink: string;
	@Input() collectorId: number;
	@Input() showSocInsteadSource: boolean;
	@Input() matemChoice: boolean;
	@Input() editable = true;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private readonly router: Router,
				private readonly modal: MatDialog,
				private readonly snackBar: MatSnackBar,
				private readonly participService: ParticipService,
				private readonly collectorService: SchoolCollectorService) { }

	ngOnInit() {
		if (this.showSocInsteadSource) {
			this.displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'ActualCode12', 'del-action'];
			this.columnsWhenFinished = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'ActualCode12'];
		}

		if (this.matemChoice) {
			this.columnsWhenFinished = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'matemChoice'];
        }
	}

	ngAfterViewInit() {
		this.dataSource = new MatTableDataSource<ParticipModel>(this.particips);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

		if (this.collectorId) {
			this.collectorService.getCollectorState(this.collectorId).subscribe(res => this.isFinished = res.IsFinished);
		}
	}

	get listEditable() {
		return !this.isFinished && this.addParticipRouterLink;
    }

	addClassParticip() {
		this.router.navigate([this.addParticipRouterLink]);
	}

	applyFilter(filterValue: string) {
		// во время поиска сбрасываем paginator на первую страницу
		this.paginator.pageIndex = 0;

		filterValue = filterValue.trim().toLowerCase();
		this.dataSource.filter = filterValue;
	}

	setAsFinished() {
		this.collectorService.isFinished(this.collectorId, true).subscribe(_ => this.isFinished = true);
	}

	cancelFinish() {
		this.collectorService.isFinished(this.collectorId, false).subscribe(() => this.isFinished = false);
	}

	setMatemBase(particip: ParticipModel, val: number | null) {
		particip.ActualCode22 = val;
		this.participService.putParticip(particip, particip.Id).subscribe(() => { });
    }

	//updateClassParticip(classParticip: ParticipModel) {
	//	this.router.navigate(['/update', classParticip.Id]);
	//}

	deleteClassParticip(particip: ParticipModel) {
		let participIndex = this.particips.indexOf(particip);
		const modalRef = this.modal.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вместе с участником будут удалены все его результаты! Продолжить удаление?` }
		});

		modalRef.afterClosed().subscribe((isDelete: boolean) => {
			if (isDelete) {
				this.participService.deleteParticip(particip.Id)
					.subscribe(() => {
						//this.getParticips();
						this.particips.splice(participIndex, 1);
						this.dataSource.data = this.particips;
						this.snackBar.open('участник удален!', 'OK', { duration: 3000 });
					});
			}
		});
	}
}