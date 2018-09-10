﻿import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TablePaginator } from '../../../../shared/table-paginator/table-paginator';
import { ClassModel } from '../../../../models/class.model';
import { ClassService } from '../../../../services/class.service';
import { AccountService } from '../../../../services/account.service';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { ParticipGetModel, ParticipsList } from '../../../../models/first-class/particip-get.model';
import { ParticipService } from '../../../../services/first-class/particips.service';
import { setToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../../../../utils/local-storage';

const CLASS_ID_KEY = 'FIRST_CLASS_ID';

@Component({
	templateUrl: `./app/components/first-class/particips/list/particips-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/first-class/particips/list/particips-list.component.css?v=${new Date().getTime()}`]
})
export class ParticipsListComponent {
	particips: ParticipGetModel[] = [];
	classes: ClassModel[] = [];

	isLoading: boolean;
	searchText: string;
	searchClass: string;
	pageIndex = 0;
	limitToVal = 20;
	participsLength = 0;

	isFailingSchool = false;

	selectionChange$ = new Subject<any>();
	@ViewChild(TablePaginator) paginator: TablePaginator;
	@ViewChild('searchField') searchField: ElementRef;

	constructor(private participService: ParticipService,
		private classService: ClassService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private accountService: AccountService) { }

	ngOnInit() {
		this.isLoading = true;

		this.searchClass = getFromLocalStorage(CLASS_ID_KEY);

		const search$ = fromEvent(this.searchField.nativeElement, 'input')
			.pipe(
				debounceTime(1000)
		);
		search$.subscribe(() => this.pageIndex = 0);

		merge(this.paginator.page, search$, this.selectionChange$)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoading = true;
					return this.createRequest();
				}),
				map((data: ParticipsList) => {
					this.isLoading = false;
					this.participsLength = data.TotalCount;
					this.classes = data.Classes;
					return data.Items;
				})
			).subscribe((particips: ParticipGetModel[]) => this.particips = particips);
		//this.participService.getAll().subscribe(res => {
		//	this.particips = res;
		//	this.isLoading = false;
		//});
	}

	private createRequest(): Observable<ParticipsList> {
		return this.participService.getAll({
			page: this.pageIndex + 1,
			length: this.limitToVal,
			search: this.searchText,
			classId: this.searchClass
		});
	}

	deleteParticip(particip: ParticipGetModel) {
		particip.isDeleting = true;
		const participId = particip.Id;
		const participIndex = this.particips.indexOf(particip);

		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вы уверены что хотите исключить участника '${particip.Surname} ${particip.Name} ${particip.SecondName}' из диагностики?` }
		});

		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.participService.deleteParticip(participId).subscribe(() => {
					particip.isDeleting = false;
					this.particips.splice(participIndex, 1);
					this.snackBar.open('участник исключен из диагностики', 'OK', { duration: 3000 });
				});
			} else {
				particip.isDeleting = false;
			}
		});
	}

	selectionChange() {
		this.pageIndex = 0;

		if (this.searchClass) {
			setToLocalStorage(CLASS_ID_KEY, this.searchClass);
		} else {
			removeFromLocalStorage(CLASS_ID_KEY);
		}

		this.selectionChange$.next({});
	}
}
