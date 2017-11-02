import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../shared/report.service';
import { ReportModel } from './report.model';

@Component({
    selector: 'rsur-report',    
	templateUrl: `./app/rsur/reports/report/report.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/rsur/reports/report/report.component.css?v=${new Date().getTime()}`]
})
export class ReportComponent implements OnInit {
    reportData: ReportModel;    

    constructor(private readonly reportService: ReportService,
				private readonly router: ActivatedRoute) { }

	ngOnInit() {
		this.router.params.subscribe(params => {
		    const code: number = params['id'];
            this.reportService.getReport(code).subscribe(res => {
                this.reportData = res.json() as ReportModel;                
            });
		});
	}
}
