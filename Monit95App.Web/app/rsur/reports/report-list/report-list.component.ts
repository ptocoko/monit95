import { Component, OnInit } from '@angular/core';
import { ReportService } from '../shared/report.service';
import { ReportModel } from './report.model';
import { Router } from '@angular/router';

const TEST_DATE = '2017-10-11';

@Component({
	selector: 'report-list',
    templateUrl: `./app/rsur/reports/report-list/report-list.component.html?v=${new Date().getTime()}`
})
export class ReportListComponent implements OnInit {
    resultsList: ReportModel[];
    rsurTests: string[];
    schools: string[];
	isLoading: boolean;
    searchTest: string = 'Все блоки';
    searchSchool: string = 'Все организации';

	constructor(private readonly reportService: ReportService, 
				private readonly route: Router) { }

	ngOnInit() {
		this.isLoading = true;
        this.reportService.getReports(TEST_DATE).subscribe(res => {
            this.resultsList = res.json() as ReportModel[];
            this.rsurTests = this.resultsList.map(s => s.TestNameWithDate)
                .filter((val, i, self) => self.indexOf(val) === i); // distinct
            //this.schools = this.resultsList.map(s => s.SchoolParticipInfo.SchoolName).filter((val, i, self) => self.indexOf(val) === i);
            
	        this.isLoading = false;
	    });
	}

	openReport(rsurParticipCode: number) {
	    this.route.navigate(['/rsur/report', rsurParticipCode]);
	}
}
