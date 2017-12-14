import { Component, OnInit } from '@angular/core';
import { ReportModel } from './report.model';
import { Router } from '@angular/router';
import { RsurReportService } from '../../../../services/rsur-report.service';
import { AccountService } from '../../../../services/account.service';

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
    selectedSchool: string;
    selectedTest: string;
    searchParticip: string;
    
	constructor(private readonly rsurReportService: RsurReportService, 
                private readonly route: Router,
                private readonly accountService: AccountService) {
    }
    
    ngOnInit() {        
        var schoolFromStorage = localStorage.getItem('selectedSchool');
        this.selectedSchool = schoolFromStorage ? schoolFromStorage : 'Все организации';
        var testFromStorage = localStorage.getItem('selectedTest');        
        this.selectedTest = testFromStorage ? testFromStorage : 'Все блоки';        

		this.isLoading = true;
        this.rsurReportService.getReports(TEST_DATE).subscribe(res => {
            this.resultsList = res.json() as ReportModel[];
            this.rsurTests = this.resultsList.map(s => s.TestNameWithDate)
                .filter((val, i, self) => self.indexOf(val) === i); // distinct            
            
	        this.isLoading = false;
	    });
	}

    openReport(rsurParticipCode: number) {
        localStorage.setItem('selectedSchool', this.selectedSchool);
        localStorage.setItem('selectedTest', this.selectedTest);
	    this.route.navigate(['/rsur/report', rsurParticipCode]);
	}
}
