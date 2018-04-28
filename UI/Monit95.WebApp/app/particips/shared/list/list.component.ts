import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ParticipModel } from '../../../models/particip.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ParticipService } from '../../../services/particip.service';

@Component({
	selector: 'table-list',
	templateUrl: `./app/particips/shared/list/list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/shared/list/list.component.css?v=${new Date().getTime()}`]
})
export class ListComponent {
	displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'SourceName', 'del-action']
	participsCount = 0;
	dataSource = new MatTableDataSource<ParticipModel>();

	@Input() particips: ParticipModel[];
	@Input() addParticipRouterLink: string;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private readonly router: Router,
				private readonly modal: MatDialog,
				private readonly snackBar: MatSnackBar,
				private readonly participService: ParticipService) { }

	ngAfterViewInit() {
		this.dataSource = new MatTableDataSource<ParticipModel>(this.particips);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
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
						this.dataSource.data = this.particips.splice(participIndex, 1);
						this.snackBar.open('участник удален!', 'OK', { duration: 3000 });
					});
			}
		});
	}
}