import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RsurReportService } from '../../../../services/rsur-report.service';
import { AccountService } from '../../../../services/account.service';
import { RsurReportModel } from '../../../../models/rsur-report.model';
import { MatTableDataSource, MatSelectChange, MatPaginator } from '@angular/material';

const TEST_DATE = '2017-10-11';
export const SCHOOLNAME_DEFAULT_SELECTION = 'все организации';
export const TESTNAME_DEFAULT_SELECTION = 'все блоки';
export const EXAMNAME_DEFAULT_SELECTION = 'все диагностики';

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
	searchParticipText: string;

	@ViewChild('paginator') paginator: MatPaginator;
    
	constructor(private readonly rsurReportService: RsurReportService, 
                private readonly route: Router,
                private readonly accountService: AccountService) {
    }
    
    ngOnInit() {        
        var schoolFromStorage = localStorage.getItem('selectedSchool');
		this.selectedSchool = schoolFromStorage ? schoolFromStorage : SCHOOLNAME_DEFAULT_SELECTION;

        var testFromStorage = localStorage.getItem('selectedTest');        
		this.selectedTest = testFromStorage ? testFromStorage : TESTNAME_DEFAULT_SELECTION; 

		var examFromStorage = localStorage.getItem('selectedExam');
		this.selectedExam = examFromStorage ? examFromStorage : EXAMNAME_DEFAULT_SELECTION;

		this.isLoading = true;
        this.rsurReportService.getReports().subscribe(reports => {
			this.reportsList = reports;
			this.dataSource = new MatTableDataSource(reports);
			
			$().ready(() => {
				this.dataSource.paginator = this.paginator;
				this.filterSelectionChange();
			});

	        this.isLoading = false;
	    });
	}

	/**
	 * Метод-обработчик для события focus в input'е "поиск участника". Сбрасывает все значения фильтрации для данных в таблице.
	Сброс происходит только если значение input'а пустое
	 * @param value
	 */
	searchInputFocused(value: any) {
		if (!value) {
			this.resetAllSelects();

			//сбрасываем paginator на первую страницу
			this.paginator.pageIndex = 0;
		}
	}

	/**
	 * Метод-обработчик для события keyup и поиска среди данных в таблице по коду участника и ФИО.
	 * @param searchText
	 */
	searchParticip(searchText: string) {
		this.dataSource.filterPredicate = participSearchPredicate;

		this.dataSource.filter = searchText.toLowerCase();
	}

	/**
	 * метод-обработчик события change для всех select, который делает фильтрацию данных таблицы по значениям всех select'ов сразу
	 */
	filterSelectionChange() {
		//во время фильтрации данных по значеиям из select'ов сбрасываем поиск по коду участника и ФИО
		this.searchParticipText = '';

		//сбрасываем paginator на первую страницу
		this.paginator.pageIndex = 0;

		this.dataSource.filterPredicate = filterBySelectionsPredicate;
		
		this.dataSource.filter = `${this.selectedSchool};${this.selectedTest};${this.selectedExam}`;
	}

	openReport(report: RsurReportModel) {
		if (report.TestStatus.toLowerCase() !== 'отсутствовал' && report.ExamName.toLowerCase() !== 'апрель-2017') {
			localStorage.setItem('selectedSchool', this.selectedSchool);
			localStorage.setItem('selectedTest', this.selectedTest);
			localStorage.setItem('selectedExam', this.selectedExam);

			this.route.navigate(['/rsur/report', report.RsurParticipTestId]);
		}
	}

	/**
	 * Сбрасывает все значения select'ов. 
	 */
	resetAllSelects() {
		this.selectedSchool = SCHOOLNAME_DEFAULT_SELECTION;
		this.selectedTest = TESTNAME_DEFAULT_SELECTION;
		this.selectedExam = EXAMNAME_DEFAULT_SELECTION;

		//так как значения select'ов изменены в коде необходимо принудительно вызвать их метод-обработчик для change
		this.filterSelectionChange();
	}
}

const participSearchPredicate = (particip: RsurReportModel, searchText: string) => {
	return particip.ParticipCode.toString().indexOf(searchText) > -1 ||
		particip.SchoolParticipInfo.Surname.toLowerCase().indexOf(searchText) > -1 ||
		particip.SchoolParticipInfo.Name.toLowerCase().indexOf(searchText) > -1;
}

/**
 * Предикат для фильтрации данных в MatTable по значениям всех select'ов.
TODO: требует рефакторинга.
 * @param report единичный экземпляр из фильруемого списка
 * @param filterValuesString значение для фильрации из всех списков, представленные в строковом виде
и объединенные через точку с запятой. ('{schoolName};{testName};{examName}').
 */
const filterBySelectionsPredicate = (report: RsurReportModel, filterValuesString: string) => {
	let filterValues = filterValuesString.split(';');
	if (filterValues.length !== 3)
		throw Error(`something wrong with ${filterValuesString}`);

	let schoolName = filterValues[0];
	let testName = filterValues[1];
	let examName = filterValues[2];

	let result: boolean = true;

	//каждое значение select'а сверяется с соответствующим значением по умолчанию
	//
	if (!schoolName || schoolName !== SCHOOLNAME_DEFAULT_SELECTION) {
		result = result && report.SchoolParticipInfo.SchoolName === schoolName;
	}
	else {
		result = result && true;
	}

	if (testName !== TESTNAME_DEFAULT_SELECTION) {
		result = result && report.TestName == testName;
	}
	else {
		result = result && true;
	}

	if (examName !== EXAMNAME_DEFAULT_SELECTION) {
		result = result && report.ExamName === examName;
	}
	else {
		result = result && true;
	}
	return result;

}