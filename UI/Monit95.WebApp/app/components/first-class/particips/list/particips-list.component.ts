import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, startWith, switchMap, takeUntil, map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
//import { startWith } from 'rxjs/operators/startWith';
//import { switchMap } from 'rxjs/operators/switchMap';
//import { map } from 'rxjs/operators/map';
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
import { SchoolCollectorService } from '../../../../shared/school-collector.service';

export const CLASS_ID_KEY = 'FIRST_CLASS_ID';
const COLLECTOR_ID = 49;

@Component({
	templateUrl: `./app/components/first-class/particips/list/particips-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/first-class/particips/list/particips-list.component.css?v=${new Date().getTime()}`]
})
export class ParticipsListComponent {
	particips: ParticipGetModel[] = [];
	classes: ClassModel[] = [];

	isFinished: boolean;
	isLoading: boolean;
	searchText: string;
	searchClass: string;
	pageIndex = 0;
	limitToVal = 40;
	participsLength = 0;

	isFailingSchool = false;

	selectionChange$ = new Subject<any>();
	isFinished$ = new Subject<void>();

	@ViewChild(TablePaginator) paginator: TablePaginator;
	@ViewChild('searchField') searchField: ElementRef;

	constructor(private participService: ParticipService,
		private classService: ClassService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private accountService: AccountService,
		private collectorService: SchoolCollectorService) { }

	ngOnInit() {
		this.isLoading = true;

		this.collectorService.getCollectorState(COLLECTOR_ID).subscribe(state => {
			this.isFinished = state.IsFinished;

			if (!this.isFinished) {
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
						}),
						takeUntil(this.isFinished$)
					).subscribe((particips: ParticipGetModel[]) => this.particips = particips);
			}
		});
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

	finish() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Завершить заполнение списка участников?` }
		});

		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.collectorService.isFinished(COLLECTOR_ID, true).subscribe(() => {
					this.isFinished = true;
					this.isFinished$.next();
				});
			}
		});
	}

	notFinished() {
		this.collectorService.isFinished(COLLECTOR_ID, false).subscribe(() => {
			this.isFinished = false;
			this.ngOnInit();
		});
	}
}
