import { Component, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ParticipModel } from '../../../models/particip.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ParticipsService } from '../../../services/refactored/particips.service';

@Component({
	templateUrl: `./app/components/particips/list/list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/particips/list/list.component.css?v=${new Date().getTime()}`]
})
export class ListComponent {
	particips: ParticipModel[] = [];

	projectId: number;
    projectName: string;

	displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'ClassName', 'del-action']
	dataSource = new MatTableDataSource<ParticipModel>();

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private readonly router: Router,
		private route: ActivatedRoute,
		private readonly modal: MatDialog,
		private readonly snackBar: MatSnackBar,
		private readonly participsService: ParticipsService) { }

	ngAfterViewInit() {
		this.projectId = this.route.snapshot.data['projectId'];
		this.projectName = this.route.snapshot.data['projectName'];

		this.participsService.getAll(this.projectId).subscribe(particips => {
			this.dataSource = new MatTableDataSource<ParticipModel>(particips);
			this.particips = particips;
		});

		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	addClassParticip() {
		this.router.navigate(['/particips2/new', { 'projectId': this.projectId, 'projectName': this.projectName }]);
	}

	applyFilter(filterValue: string) {
		// во время поиска сбрасываем paginator на первую страницу
		this.paginator.pageIndex = 0;

		filterValue = filterValue.trim().toLowerCase();
		this.dataSource.filter = filterValue;
	}
	
	deleteClassParticip(particip: ParticipModel) {
		let participIndex = this.particips.indexOf(particip);

		const modalRef = this.modal.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вместе с участником будут удалены все его результаты! Продолжить удаление?` }
		});

		modalRef.afterClosed().subscribe((isDelete: boolean) => {
			if (isDelete) {
				this.participsService.delete(particip.Id)
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