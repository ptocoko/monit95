import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RsurReportService } from '../../../../services/rsur-report.service';
import { AccountService } from '../../../../services/account.service';
import { RsurReportModel, ReportsList } from '../../../../models/rsur-report.model';
import { MatTableDataSource, MatSelectChange, MatPaginator, MatSelect } from '@angular/material';
import { ReportsInfo } from '../../../../models/rsur-reports-info.model';
import { merge ,  fromEvent ,  Observable ,  Subject ,  Subscription } from 'rxjs';
import { debounceTime ,  map ,  startWith ,  switchMap } from 'rxjs/operators';

export const SCHOOLNAME_DEFAULT_SELECTION = 'все организации';
export const TESTNAME_DEFAULT_SELECTION = 'все блоки';
export const EXAMNAME_DEFAULT_SELECTION = 'все диагностики';

@Component({
	selector: 'report-list',
	templateUrl: './report-list.component.html',
	styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements AfterViewInit, OnDestroy {
	reportsList: RsurReportModel[];
	reportsInfo: ReportsInfo = {};

	searchSub$: Subscription;
	reportsSub$: Subscription;
	
	displayedColumns = ['number', 'code', 'surname', 'name', 'secondName', 'schoolName', 'examName', 'testStatus'];
	dataSource = new MatTableDataSource();

    selectedSchool = SCHOOLNAME_DEFAULT_SELECTION;
	selectedTest = TESTNAME_DEFAULT_SELECTION;
	selectedExamCode: string = EXAMNAME_DEFAULT_SELECTION;
	searchParticipText: string;

	@ViewChild('paginator') paginator: MatPaginator;
	@ViewChild('searchField') searchField: ElementRef;
	
	selectionChange$ = new Subject<number>();
	clearHook$ = new Subject<void>();

	isLoadingReports: boolean = true;
	reportsLength = 0;
    
	constructor(private readonly rsurReportService: RsurReportService,
                private readonly route: Router,
                public readonly accountService: AccountService) {
    }
    
	ngAfterViewInit() {
		const search$ = fromEvent(this.searchField.nativeElement, 'input')
			.pipe(
				debounceTime(1000)
			);
		this.searchSub$ = search$.subscribe(() => this.paginator.pageIndex = 0);

		this.reportsSub$ = this.rsurReportService.getReportsInfo()
			.pipe(
				switchMap(info => {
					this.reportsInfo = info;
					return merge(this.paginator.page, search$, this.selectionChange$, this.clearHook$)
				}),
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
			)
			.subscribe((reports: RsurReportModel[]) => this.dataSource.data = reports);
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

	clearFilter() {
		this.selectedSchool = SCHOOLNAME_DEFAULT_SELECTION;
		this.selectedTest = TESTNAME_DEFAULT_SELECTION;
		this.selectedExamCode = EXAMNAME_DEFAULT_SELECTION;
		this.searchParticipText = null;

		this.clearHook$.next();
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

	ngOnDestroy() {
		this.searchSub$.unsubscribe();
		this.reportsSub$.unsubscribe();
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