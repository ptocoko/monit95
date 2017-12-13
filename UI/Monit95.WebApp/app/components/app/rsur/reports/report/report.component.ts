import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RsurReportService } from '../../../../services/rsur-report.service';
import { RsurReportModel } from '../../../../models/rsur-report.model';

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
                this.reportData = res.json() as RsurReportModel;                
            });
		});
	}
}