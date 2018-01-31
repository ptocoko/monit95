import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipService } from '../../services/particip.service';
//import { ClassParticip } from '../ClassParticip';
import { ParticipModel } from '../../models/particip.model';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Constant } from '../../shared/constants';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';


@Component({
	templateUrl: `./app/particips/list/particips-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/list/particips-list.component.css?v=${new Date().getTime()}`]
})
export class ParticipsListComponent implements OnInit {
	displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'SourceName', 'del-action']
	participsCount: number;
	dataSource = new MatTableDataSource<ParticipModel>();
	isLoading: boolean;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
		private readonly participService: ParticipService,
		private readonly router: Router,
		private readonly modal: MatDialog) {

	}

	ngOnInit() {
		this.getParticips();
	}


	private getParticips() {
		this.isLoading = true;
		this.participService.getAll(Constant.PROJECT_ID).subscribe(res => {
			this.participsCount = res.length;
			this.dataSource = new MatTableDataSource<ParticipModel>(res);
			this.isLoading = false;
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
		});
	}

	applyFilter(filterValue: string) {
		this.paginator.pageIndex = 0;
		filterValue = filterValue.trim().toLowerCase();
		this.dataSource.filter = filterValue;
	}

	addClassParticip() {
	    this.router.navigate(['/particips/new']);
	}

	//updateClassParticip(classParticip: ParticipModel) {
	//	this.router.navigate(['/update', classParticip.Id]);
	//}

	deleteClassParticip(particip: ParticipModel) {
		const modalRef = this.modal.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вы уверены что хотите удалить участника ${particip.Surname} ${particip.Name} ${particip.SecondName}?` }
		});

		modalRef.afterClosed().subscribe((isDelete: boolean) => {
			if (isDelete) {
				this.participService.deleteParticip(particip.DocumNumber)
						.subscribe(res => this.getParticips());
			}
		});
	}
}