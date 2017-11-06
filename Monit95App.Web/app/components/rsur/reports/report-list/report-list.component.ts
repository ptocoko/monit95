﻿import { Component, OnInit } from '@angular/core';
import { RsurReportService } from '../../../../services/rsur-report.service';
import { ReportModel } from './report.model';
import { Router } from '@angular/router';

const TEST_DATE = '2017-10-11';

@Component({
	selector: 'report-list',
    templateUrl: `./app/components/rsur/reports/report-list/report-list.component.html?v=${new Date().getTime()}`
})
export class ReportListComponent implements OnInit {
    resultsList: ReportModel[];
    rsurTests: string[];
    schools: string[];
	isLoading: boolean;
    selectedTest: string = 'Все блоки';
    selectedSchool: string = 'Все организации';

	constructor(private readonly rsurReportService: RsurReportService, 
        private readonly route: Router) {
    }

	ngOnInit() {
		this.isLoading = true;
        this.rsurReportService.getReports(TEST_DATE).subscribe(res => {
            this.resultsList = res.json() as ReportModel[];
            this.rsurTests = this.resultsList.map(s => s.TestNameWithDate)
                .filter((val, i, self) => self.indexOf(val) === i); // distinct            
            
	        this.isLoading = false;
	    });
	}

	openReport(rsurParticipCode: number) {
	    this.route.navigate(['/rsur/report', rsurParticipCode]);
	}
}