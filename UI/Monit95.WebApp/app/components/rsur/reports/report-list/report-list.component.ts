import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RsurReportService } from '../../../../services/rsur-report.service';
import { AccountService } from '../../../../services/account.service';
import { RsurReportModel } from '../../../../models/rsur-report.model';
import { MatTableDataSource, MatSelectChange, MatPaginator } from '@angular/material';

const TEST_DATE = '2017-10-11';

@Component({
	selector: 'report-list',
	templateUrl: `./app/components/rsur/reports/report-list/report-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/reports/report-list/report-list.component.css?v=${new Date().getTime()}`]
})
export class ReportListComponent implements OnInit {
    reportsList: RsurReportModel[];
	isLoading: boolean;
	displayedColumns = ['number', 'code', 'surname', 'name', 'secondName', 'schoolName', 'examName', 'testStatus'];
	dataSource = new MatTableDataSource();

    selectedSchool: string;
	selectedTest: string;
	selectedExam: string;
    //searchParticip: string;

	@ViewChild('paginator') paginator: MatPaginator;
    
	constructor(private readonly rsurReportService: RsurReportService, 
                private readonly route: Router,
                private readonly accountService: AccountService) {
    }
    
    ngOnInit() {        
        var schoolFromStorage = localStorage.getItem('selectedSchool');
        this.selectedSchool = schoolFromStorage ? schoolFromStorage : 'все организации';
        var testFromStorage = localStorage.getItem('selectedTest');        
		this.selectedTest = testFromStorage ? testFromStorage : 'все блоки'; 
		var examFromStorage = localStorage.getItem('selectedExam');
		this.selectedExam = examFromStorage ? examFromStorage : 'все диагностики';

		this.isLoading = true;
        this.rsurReportService.getReports().subscribe(reports => {
			this.reportsList = reports;           
			this.dataSource = new MatTableDataSource(reports);
			$().ready(() => this.dataSource.paginator = this.paginator);
	        this.isLoading = false;
	    });
	}

	searchParticip(searchText: string) {
		this.dataSource.filterPredicate = participSearchPredicate;

		this.dataSource.filter = searchText.toLowerCase();
	}

	filterByExamName(examName: string) {
		this.dataSource.filterPredicate = examNameFilterPredicate;

		if (examName === 'все диагностики') {
			this.dataSource.filter = null;
		}
		else {
			this.dataSource.filter = examName;
		}
	}

	filterByTestName(testName: string) {
		this.dataSource.filterPredicate = testNameFilterPredicate;
		if (testName === 'все блоки') {
			this.dataSource.filter = null;
		}
		else {
			this.dataSource.filter = testName;
		}
	}

	filterBySchoolName(schoolName: string) {
		this.dataSource.filterPredicate = schoolNameFilterPredicate;
		if (schoolName === 'все организации') {
			this.dataSource.filter = null;
		}
		else {
			this.dataSource.filter = schoolName;
		}
	}

	openReport(report: RsurReportModel) {
		if (report.TestStatus.toLowerCase() !== 'отсутствовал' && report.ExamName.toLowerCase() !== 'апрель-2017') {
			localStorage.setItem('selectedSchool', this.selectedSchool);
			localStorage.setItem('selectedTest', this.selectedTest);
			localStorage.setItem('selectedExam', this.selectedExam);
			this.route.navigate(['/rsur/report', report.RsurParticipTestId]);
		}
	}

	resetAllInputs() {
		this.selectedSchool = 'все организации';
		this.selectedTest = 'все блоки';
		this.selectedExam = 'все диагностики';
	}
}

const participSearchPredicate = (particip: RsurReportModel, searchText: string) => {
	return particip.ParticipCode.toString().indexOf(searchText) > -1 ||
		particip.SchoolParticipInfo.Surname.toLowerCase().indexOf(searchText) > -1 ||
		particip.SchoolParticipInfo.Name.toLowerCase().indexOf(searchText) > -1;
}

const schoolNameFilterPredicate = (report: RsurReportModel, schoolName: string) => {
	return report.SchoolParticipInfo.SchoolName === schoolName;
}

const testNameFilterPredicate = (report: RsurReportModel, testName: string) => {
	return report.TestName === testName;
}

const examNameFilterPredicate = (report: RsurReportModel, examName: string) => {
	return report.ExamName === examName;
}