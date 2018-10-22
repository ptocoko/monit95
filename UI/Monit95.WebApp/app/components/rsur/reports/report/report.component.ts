import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RsurReportModel } from '../../../../models/rsur-report.model';
import { RsurReportService } from '../../../../services/rsur-report.service';

@Component({
    selector: 'report',    
	templateUrl: `./app/components/rsur/reports/report/report.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/reports/report/report.component.css?v=${new Date().getTime()}`]
})
export class ReportComponent implements OnInit {
	reportData: RsurReportModel;    

    constructor(private readonly reportService: RsurReportService,
				private readonly router: ActivatedRoute) { }

	ngOnInit() {
		this.router.params.subscribe(params => {
		    const code: number = params['id'];
            this.reportService.getReport(code).subscribe(res => {
				this.reportData = res;
            });
		});
	}

	getGradeColor(grade100: number) {
		if (this.reportData.TestNumberCode === "0104" && this.reportData.RsurTestId > 2141) {
			return grade100 < 50 ? 'low-grade' : grade100 < 80 ? 'medium-grade' : 'high-grade';
		} else {
			if (grade100 < 60) {
				return 'low-grade';
			} else if (grade100 > 59 && grade100 < 81) {
				return 'medium-grade';
			} else {
				return 'high-grade';
			}
		}
	}
}