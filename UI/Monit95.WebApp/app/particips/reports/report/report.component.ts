import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../../../services/iTakeEge/reports/reports.service';
import { ReportModel } from '../../../models/iTakeEge/reports/report.model';

@Component({
	templateUrl: `./app/particips/reports/report/report.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/reports/report/report.component.css?v=${new Date().getTime()}`]
})
export class ReportComponent {
	reportData: ReportModel;

	constructor(private readonly reportService: ReportsService,
		private readonly router: ActivatedRoute) { }

	ngOnInit() {
		this.router.params.subscribe(params => {
			const participTestId: number = params['participTestId'];
			this.reportService.getExtendReport(participTestId).subscribe(res => {
				this.reportData = res;
			});
		});
	}

	getGradeColor(grade100: number) {
		if (grade100 < 60) {
			return 'low-grade';
		} else if (grade100 > 59 && grade100 < 81) {
			return 'medium-grade';
		} else {
			return 'high-grade';
		}
	}
}