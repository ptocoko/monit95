import { Component, OnInit } from '@angular/core';
import { ReportModel } from './report.model';
import { Router } from '@angular/router';
import { RsurReportService } from '../../../../services/rsur-report.service';
import { AccountService } from '../../../../services/account.service';
import { RsurReportModel } from '../../../../models/rsur-report.model';

const TEST_DATE = '2017-10-11';

@Component({
	selector: 'report-list',
	templateUrl: `./app/components/rsur/reports/report-list/report-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/reports/report-list/report-list.component.css?v=${new Date().getTime()}`]
})
export class ReportListComponent implements OnInit {
    reportsList: RsurReportModel[];
    
	isLoading: boolean;

    selectedSchool: string;
	selectedTest: string;
	selectedExam: string;

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
		var examFromStorage = localStorage.getItem('selectedExam');
		this.selectedExam = examFromStorage ? examFromStorage : 'Все диагностики';

		this.isLoading = true;
        this.rsurReportService.getReports().subscribe(reports => {
			this.reportsList = reports;           
            
	        this.isLoading = false;
	    });
	}

    openReport(rsurParticipTestId: number) {
        localStorage.setItem('selectedSchool', this.selectedSchool);
		localStorage.setItem('selectedTest', this.selectedTest);
		localStorage.setItem('selectedExam', this.selectedExam);
		this.route.navigate(['/rsur/report', rsurParticipTestId]);
	}
}
