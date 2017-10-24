
import { Component, OnInit } from '@angular/core';
import { RsurReportService } from "./rsur-report.service";
import { RsurReportModel } from "./rsur-report.model";

@Component({
	selector: 'rsur-report',
	templateUrl: `./app/rsur/report/rsur-report.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/rsur/report/rsur-report.component.css?v=${new Date().getTime()}`]
})
export class RsurReportComponent implements OnInit {
	reportData: RsurReportModel

	constructor(private readonly rsurReportService: RsurReportService) { }

	ngOnInit() {
		this.rsurReportService.get().subscribe(res => this.reportData = res);
	}
}
