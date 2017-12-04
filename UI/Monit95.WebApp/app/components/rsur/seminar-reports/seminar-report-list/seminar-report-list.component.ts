
import { Component, OnInit } from '@angular/core';
import { SeminarReportService } from "../../../../services/seminar-report.service";
import { SeminarReportModel } from "../shared/seminar-report.model";
import { AccountService } from "../../../../services/account.service";

@Component({
	selector: 'reports-list',
	templateUrl: `./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.css?v=${new Date().getTime()}`]
})
export class SeminarReportsListComponent implements OnInit{
	reports: SeminarReportModel[] = new Array<SeminarReportModel>();

	constructor(private readonly seminarReportService: SeminarReportService,
				private readonly accountService: AccountService) { }

	ngOnInit() {
		this.seminarReportService.getReportsList().subscribe(res => this.reports = res);
	}

	deleteReport(reportId: number) {
		this.seminarReportService.deleteReport(reportId).subscribe(() => {
			let report = this.reports.find(s => s.RsurReportId === reportId);
			let index = this.reports.indexOf(report);
			this.reports.splice(index, 1);
		});
	}
}
