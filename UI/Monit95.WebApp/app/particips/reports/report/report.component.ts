import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../../../services/iTakeEge/reports/reports.service';
import { ReportModel } from '../../../models/iTakeEge/reports/report.model';

@Component({
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.css']
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
		if (grade100 < 34) {
			return 'low-grade';
		} else if (grade100 > 33 && grade100 < 67) {
			return 'medium-grade';
		} else {
			return 'high-grade';
		}
	}
}