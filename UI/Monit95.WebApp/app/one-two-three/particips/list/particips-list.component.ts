import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ParticipService } from '../../../services/one-two-three/particips.service';
import { ParticipModel, ParticipsList } from '../../../models/one-two-three/particip.model';
import { TablePaginator } from '../../../shared/table-paginator/table-paginator';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { ClassService } from '../../../services/class.service';
import { ClassModel } from '../../../models/class.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { AccountService } from '../../../services/account.service';
import { Subscription } from 'rxjs/Subscription';
import { SchoolCollectorService } from '../../../shared/school-collector.service';

const COLLECTOR_ID = 46;

@Component({
	templateUrl: `./app/one-two-three/particips/list/particips-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/one-two-three/particips/list/particips-list.component.css?v=${new Date().getTime()}`]
})
export class ParticipsListComponent implements OnInit, OnDestroy {
	particips: ParticipModel[] = [];
	classes: ClassModel[] = [];

	isLoading: boolean = true;
	isFinished: boolean = false;
	searchText: string;
	searchClass: string;
	pageIndex = 0;
	limitToVal = 20;
	participsLength = 0;

	isFailingSchool = false;

	selectionChange$ = new Subject<any>();
	@ViewChild(TablePaginator) paginator: TablePaginator;
	@ViewChild('searchField') searchField: ElementRef;

	participsSub$: Subscription;
	participDelSub$: Subscription;
	searchSub$: Subscription;
	collectorGetSub$: Subscription;
	collectorSetSub$: Subscription;

	constructor(private participService: ParticipService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private accountService: AccountService,
		private collectorService: SchoolCollectorService) { }

	ngOnInit() {
		this.collectorGetSub$ = this.collectorService.getCollectorState(COLLECTOR_ID)
			.subscribe(state => this.isFinished = state.IsFinished);

		const search$ = fromEvent(this.searchField.nativeElement, 'input')
			.pipe(
				debounceTime(1000)
		);
		this.searchSub$ = search$.subscribe(() => this.pageIndex = 0);

		this.participsSub$ = merge(this.paginator.page, search$, this.selectionChange$)
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
			).subscribe((particips: ParticipModel[]) => this.particips = particips);
	}

	private createRequest(): Observable<ParticipsList> {
		return this.participService.getAll({
			page: this.pageIndex + 1,
			length: this.limitToVal,
			search: this.searchText,
			classId: this.searchClass
		});
	}

	deleteParticip(particip: ParticipModel) {
		const participId = particip.Id;
		const participIndex = this.particips.indexOf(particip);

		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вы уверены что хотите исключить участника '${particip.Surname} ${particip.Name} ${particip.SecondName}' из диагностики?` }
		});

		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.participDelSub$ = this.participService.deleteParticip(participId).subscribe(() => {
					this.particips.splice(participIndex, 1);
					this.snackBar.open('участник исключен из диагностики', 'OK', { duration: 3000 });
				});
			}
		});
	}

	selectionChange() {
		this.pageIndex = 0;
		this.selectionChange$.next({});
	}

	finish() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
			disableClose: true,
			data: { message: `Вы уверены что хотите завершить редактирование списка участников?` }
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.setCollectorState(true);
			}
		});
	}

	notFinish() {
		this.setCollectorState(false);
	}

	private setCollectorState(state: boolean) {
		this.collectorSetSub$ = this.collectorService.isFinished(COLLECTOR_ID, state)
			.subscribe(() => this.isFinished = state);
	}

	ngOnDestroy() {
		if (this.participsSub$)
			this.participsSub$.unsubscribe();

		if (this.searchSub$)
			this.searchSub$.unsubscribe();

		if (this.participDelSub$)
			this.participDelSub$.unsubscribe();

		if (this.collectorSetSub$)
			this.collectorSetSub$.unsubscribe();

		if (this.collectorGetSub$)
			this.collectorGetSub$.unsubscribe();
	}
}
