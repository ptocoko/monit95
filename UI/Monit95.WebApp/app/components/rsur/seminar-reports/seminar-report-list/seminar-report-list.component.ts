
import { Component, OnInit } from '@angular/core';
import { SeminarReportModel } from "../shared/seminar-report.model";
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { AccountService } from '../../../../services/account.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'reports-list',
	templateUrl: `./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.css?v=${new Date().getTime()}`]
})
export class SeminarReportsListComponent implements OnInit{
	reports: Observable<SeminarReportModel[]>;

	constructor(private readonly seminarReportService: SeminarReportService,
				private readonly accountService: AccountService) { }

	ngOnInit() {
		this.reports = this.seminarReportService.getReportsList();
	}

	deleteReport(reportId: number) {
		this.seminarReportService.deleteReport(reportId).subscribe();
	}
}
