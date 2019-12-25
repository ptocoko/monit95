import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ReportsListModel, ReportItem } from '../../../models/iTakeEge/reports/reports-list.model';
import { ReportsInfo } from '../../../models/iTakeEge/reports/reports-info.model';
import { ReportsService } from '../../../services/iTakeEge/reports/reports.service';
import { AccountService } from '../../../services/account.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	templateUrl: `./app/particips/reports/list/list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/reports/list/list.component.css?v=${new Date().getTime()}`]
})
export class ReportsListComponent {
	reportsList: ReportsListModel[];
	reportsInfo: ReportsInfo = {} as ReportsInfo;
	projectId: number;
	projectName: string;

	schoolId: string = '';
	testCode: string = '';
	searchParticipText: string;

	displayedColumns = ['number', 'surname', 'name', 'secondName', 'testName', 'passStatus'];
	dataSource = new MatTableDataSource<ReportItem>();
	

	@ViewChild('paginator') paginator: MatPaginator;
	@ViewChild('searchField') searchField: ElementRef;

	selectionChange$ = new Subject<number>();

	isLoadingReports: boolean = true;
	reportsLength = 0;

	routeSubs: Subscription;

	constructor(private readonly rsurReportService: ReportsService,
		private readonly route: Router,
		private readonly router: ActivatedRoute,
		public readonly accountService: AccountService) {
	}

	ngAfterViewInit() {
		this.router.paramMap.subscribe(params => {
			this.projectId = Number.parseInt(params.get('projectId'), 10);
			const projectName = this.router.snapshot.queryParams['projectName'];
			if (projectName) {
				setTimeout(() => this.projectName = projectName, 0);
			}

			this.rsurReportService.getReportsInfo(this.projectId).subscribe(info => {
				this.reportsInfo = info;

				const search$ = fromEvent(this.searchField.nativeElement, 'input')
					.pipe(
					debounceTime(1000)
					);
				search$.subscribe(() => this.paginator.pageIndex = 0);

				merge(this.paginator.page, search$, this.selectionChange$)
					.pipe(
					startWith([]),
					switchMap(() => {
						this.isLoadingReports = true;
						return this.createRequest();
					}),
					map((data: ReportsListModel) => {
						this.isLoadingReports = false;
						this.reportsLength = data.TotalCount;
						return data.Items;
					})
				).subscribe((reports: ReportItem[]) => this.dataSource.data = reports);
			});

		})
	}

	private createRequest(): Observable<ReportsListModel> {
		return this.rsurReportService.getReportsList(
			{
				... this.schoolId && this.accountService.isArea() ? { schoolId: this.schoolId } : {},
				... this.testCode ? { testCode: this.testCode } : {},
				... this.searchParticipText ? { searchParticipText: this.searchParticipText } : {},
				projectId: this.projectId.toString(),
				page: (this.paginator.pageIndex + 1).toString(),
				pageSize: this.paginator.pageSize.toString()
			}
		);
	}

	selectionChange() {
		this.paginator.pageIndex = 0;
		this.selectionChange$.next(1);
	}

	getRowStylingObject(report: ReportItem): any {
		return {
			'isClickable': report.Grade5 > 0,
			'absent-row': report.Grade5 === -1,
			'test-failed-row': report.Grade5 === 2,
			'test-pass-row': report.Grade5 === 5
		};
	}

	openReport(report: ReportItem) {
		if (report.Grade5 > 0) {
			this.route.navigate(['/particips/report', report.ParticipTestId]);
		}
	}

	clearSearchText() {
		this.searchParticipText = '';
		this.paginator.pageIndex = 0;
		this.selectionChange$.next(1);
	}

	ngOnDestroy() {
		this.routeSubs.unsubscribe();
	}
}