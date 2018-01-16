
import { Component, OnInit } from '@angular/core';
import { SeminarReportView } from "../shared/seminar-report.model";
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { AccountService } from '../../../../services/account.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'reports-list',
	templateUrl: `./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.css?v=${new Date().getTime()}`]
})
export class SeminarReportsListComponent implements OnInit{
	reports: Observable<SeminarReportView[]>;

	constructor(private readonly seminarReportService: SeminarReportService,
				private readonly accountService: AccountService,
				private readonly snackBar: MatSnackBar) { }

	ngOnInit() {
		this.getReports();
	}

	deleteReport(reportId: number) {
		this.seminarReportService.deleteReport(reportId).subscribe(response => {
			this.getReports();
			this.snackBar.open('отчет удален', 'OK', { duration: 3000 });
		});
	}

	getReports() {
		this.reports = this.seminarReportService.getReportsList();
	}
}
