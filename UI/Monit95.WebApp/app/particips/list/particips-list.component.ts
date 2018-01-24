import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipService } from '../../services/particip.service';
//import { ClassParticip } from '../ClassParticip';
import { ParticipModel } from '../../models/particip.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

const PROJECT_ID: number = 1; // "i pass ege" projectId


@Component({
	templateUrl: `./app/particips/list/particips-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/list/particips-list.component.css?v=${new Date().getTime()}`]
})
export class ParticipsListComponent implements OnInit {
	displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'ClassName', 'Birthday', 'upd-action', 'del-action']
	participsCount: number;
	dataSource = new MatTableDataSource<ParticipModel>();
	isLoading: boolean;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
		private readonly participService: ParticipService<ParticipModel>,
		private readonly router: Router) {

	}

	ngOnInit() {
		this.getParticips();
	}


	private getParticips() {
		this.isLoading = true;
		this.participService.getAll(PROJECT_ID).subscribe(res => {
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

	//addClassParticip() {
	//    this.router.navigate(['/new']);
	//}

	//updateClassParticip(classParticip: ParticipModel) {
	//	this.router.navigate(['/update', classParticip.Id]);
	//}

	//deleteClassParticip(particip: ParticipModel) {
	//	const index = this.particips.indexOf(particip);
	//	const isDelete = confirm('Вы уверены что хотите удалить данную запись?');
	//	if (isDelete) {
	//	    this.participService.deleteParticip(particip.Id).subscribe(res => {
	//	        this.particips.splice(index, 1);
	//	    });
	//	}
	//}
}