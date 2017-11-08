
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SeminarReportService } from "../../../services/seminar-report.service";
import { SeminarReportModel } from "./seminar-report.model";

@Component({
	selector: 'seminar-report',
	templateUrl: `./app/components/rsur/seminar-report/report.component.html?v=${new Date().getTime()}`
})
export class SeminarReportComponent implements OnInit {
	report: SeminarReportModel = new SeminarReportModel();
	isLoading: boolean;

	constructor(private router: Router, 
				private route: ActivatedRoute,
				private seminarReportService: SeminarReportService) { }

	ngOnInit() {
		this.isLoading = true;
		this.route.params.subscribe(params => {
			let rsurReportId = params['id'];

			this.seminarReportService.getReport(rsurReportId).subscribe(res => {
				this.report = res;
				this.isLoading = false;
			});
		})
	}
}
