import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSelectChange, MatPaginator, MatSelect } from '@angular/material';
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
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
	templateUrl: `./app/particips/reports/list/list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/reports/list/list.component.css?v=${new Date().getTime()}`]
})
export class ReportsListComponent {
	reportsList: ReportsListModel[];
	reportsInfo: ReportsInfo;
	projectTestId: number;

	testCode: string;
	searchParticipText: string;

	displayedColumns = ['number', 'surname', 'name', 'secondName', 'testName', 'passStatus'];
	dataSource = new MatTableDataSource<ReportItem>();
	

	@ViewChild('paginator') paginator: MatPaginator;
	@ViewChild('searchField') searchField: ElementRef;

	selectionChange$ = new Subject<number>();

	isLoadingReports: boolean = true;
	reportsLength = 0;

	constructor(private readonly rsurReportService: ReportsService,
		private readonly route: Router,
		private readonly router: ActivatedRouteSnapshot,
		private readonly accountService: AccountService) {
	}

	ngAfterViewInit() {
		this.projectTestId = this.router.params['projectTestId'];

		this.rsurReportService.getReportsInfo(this.projectTestId).subscribe(info => {
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
	}

	private createRequest(): Observable<ReportsListModel> {

		return this.rsurReportService.getReportsList(
			{
				testCode: this.testCode,
				searchParticipText: this.searchParticipText,
				projectTestId: this.projectTestId.toString()
			}
		);
	}

	selectionChange() {
		this.paginator.pageIndex = 0;
		this.selectionChange$.next(1);
	}

	getRowStylingObject(report: ReportItem): any {
		return {
			'isClickable': report.PassStatus.toLowerCase() !== 'отсутствовал',
			'absent-row': report.PassStatus.toLowerCase() === 'отсутствовал',
			'test-failed-row': report.PassStatus.toLowerCase() === 'незачет',
			'test-pass-row': report.PassStatus.toLowerCase() === 'зачет'
		};
	}

	openReport(report: ReportItem) {
		if (report.PassStatus.toLowerCase() !== 'отсутствовал') {
			this.route.navigate(['/particips/report', report.ParticipTestId]);
		}
	}
}