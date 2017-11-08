﻿
import { Component, OnInit } from '@angular/core';
import { SeminarReportService } from "../../../../services/seminar-report.service";
import { SeminarReportModel } from "../shared/seminar-report.model";

@Component({
	selector: 'reports-list',
	templateUrl: `./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.html?v=${new Date().getTime()}`
})
export class SeminarReportsListComponent implements OnInit{
	reports: SeminarReportModel[] = new Array<SeminarReportModel>();

	constructor(private readonly seminarReportService: SeminarReportService) { }

	ngOnInit() {
		this.seminarReportService.getReportsList().subscribe(res => this.reports = res);
	}
}
