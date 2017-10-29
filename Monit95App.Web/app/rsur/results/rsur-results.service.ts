
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { RsurReportModel } from "../report/rsur-report.model";

const MOCK_REPORT: RsurReportModel = {
	Code: 15204,
	SchoolParticipInfo: {
		Surname: 'Эсамбаев',
		Name: 'Хусайн',
		SecondName: 'Арбиевич',
		SchoolName: 'Школа крутости'
	},
	TestNameWithDate: 'Экзамен на крутость, 17.11.2017',
	IsPassTest: 'зачет',
	TestDate: '17.11.2017',	
	EgeQuestionResults: [
		{
			EgeQuestionNumber: 1,
			RsurQuestionNumbers: '1.1; 1.2; 1.3',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости',
			Value: 59
		},
		{
			EgeQuestionNumber: 2,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4; 2.5; 2.6; 2.7; 2.8; 2.9; 2.10',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости',
			Value: 80
		},
		{
			EgeQuestionNumber: 3,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
			Value: 60
		},
		{
			EgeQuestionNumber: 4,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
			Value: 81
		},
		{
			EgeQuestionNumber: 3,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
			Value: 61
		},
		{
			EgeQuestionNumber: 3,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
			Value: 70
		},
		{
			EgeQuestionNumber: 3,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
			Value: 70
		}
	]
}


@Injectable()
export class RsurResultsService {
    private ROUTE_PREFIX = 'api/rsur/participReports'; 

	constructor(private readonly http: Http) {
	    
	}

	//getReport(rsurParticipCode: number): Observable<RsurReportModel> {
	//    return Observable.of(MOCK_REPORT);
	//}

    getReports(testDate: string) {
        return this.http.get(`${this.ROUTE_PREFIX}?testDate=${testDate}`);		
    }

    getReport(rsurParticipTestId: number) {
        return this.http.get(`${this.ROUTE_PREFIX}/${rsurParticipTestId}`);
    }
}
