import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RsurReportService } from '../../../../services/rsur-report.service';
import { AccountService } from '../../../../services/account.service';
import { RsurReportModel, ReportsList } from '../../../../models/rsur-report.model';
import { MatTableDataSource, MatSelectChange, MatPaginator, MatSelect } from '@angular/material';
import { ReportsInfo } from '../../../../models/rsur-reports-info.model';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export const SCHOOLNAME_DEFAULT_SELECTION = 'все организации';
export const TESTNAME_DEFAULT_SELECTION = 'все блоки';
export const EXAMNAME_DEFAULT_SELECTION = 'все диагностики';

@Component({
	selector: 'report-list',
	templateUrl: `./app/components/rsur/reports/report-list/report-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/reports/report-list/report-list.component.css?v=${new Date().getTime()}`]
})
export class ReportListComponent {
	reportsList: RsurReportModel[];
	reportsInfo: ReportsInfo = {};
	
	displayedColumns = ['number', 'code', 'surname', 'name', 'secondName', 'schoolName', 'examName', 'testStatus'];
	dataSource = new MatTableDataSource();

    selectedSchool = SCHOOLNAME_DEFAULT_SELECTION;
	selectedTest = TESTNAME_DEFAULT_SELECTION;
	selectedExamCode: string = EXAMNAME_DEFAULT_SELECTION;
	searchParticipText: string;

	@ViewChild('paginator') paginator: MatPaginator;
	@ViewChild('searchField') searchField: ElementRef;
	
	selectionChange$ = new Subject<number>();

	isLoadingReports: boolean = true;
	reportsLength = 0;
    
	constructor(private readonly rsurReportService: RsurReportService, 
                private readonly route: Router,
                private readonly accountService: AccountService) {
    }
    
	ngAfterViewInit() {
		this.rsurReportService.getReportsInfo().subscribe(info => {
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
					map((data: ReportsList) => {
						this.isLoadingReports = false;
						this.reportsLength = data.TotalCount;
						return data.Items;
					})
				).subscribe((reports: RsurReportModel[]) => this.dataSource.data = reports);
		});
	}
	
	private createRequest(): Observable<ReportsList> {
		const schoolId = getSchoolIdFromName(this.selectedSchool);
		const testCode = getTestCodeFromName(this.selectedTest);
		const examCode = getExamCode(this.selectedExamCode);

		return this.rsurReportService.getReports(
			(this.paginator.pageIndex + 1).toString(),
			this.paginator.pageSize.toString(),
			this.searchParticipText,
			schoolId,
			testCode,
			examCode
		);
	}

	selectionChange() {
		this.paginator.pageIndex = 0;
		this.selectionChange$.next(1);
	}

	openReport(report: RsurReportModel) {
		if (report.TestStatus.toLowerCase() !== 'отсутствовал' && report.ExamName.toLowerCase() !== 'апрель-2017') {
			this.route.navigate(['/rsur/report', report.RsurParticipTestId]);
		}
	}
}

function getSchoolIdFromName(selectedSchoolName: string): string {
	if (selectedSchoolName && selectedSchoolName !== SCHOOLNAME_DEFAULT_SELECTION) {
		return selectedSchoolName.split('-')[0].trim()
	}
	return null;
}

function getTestCodeFromName(selectedTestName: string): string {
	if (selectedTestName && selectedTestName !== TESTNAME_DEFAULT_SELECTION) {
		return selectedTestName.split('-')[0].trim()
	}
	return null;
}

function getExamCode(selectedExamCode: string): string {
	return selectedExamCode && selectedExamCode !== EXAMNAME_DEFAULT_SELECTION ? selectedExamCode : null;
}