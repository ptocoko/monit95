
import { Component, OnInit } from '@angular/core';
import { RsurReportService } from "../../../services/rsur-report.service";

export class ReportsListModel {
	RsurReportId: number;
	DateText: string;
	Text: string;
}

@Component({
	selector: 'reports-list',
	templateUrl: `./app/components/rsur/seminar-report/reports-list.component.html?v=${new Date().getTime()}`
})
export class SeminarReportsListComponent implements OnInit{
	reports: ReportsListModel[];

	constructor(private readonly rsurReportService: RsurReportService) { }

	ngOnInit() {
		this.rsurReportService.getSeminarReportsList().subscribe(res => this.reports = res);
	}
}
