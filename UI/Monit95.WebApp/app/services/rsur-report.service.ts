import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportModel } from '../components/rsur/reports/report-list/report.model';
import { Observable } from 'rxjs/Observable';
import { RsurReportModel } from '../models/rsur-report.model';

@Injectable()
export class RsurReportService {
    private ROUTE_PREFIX = 'api/rsur/participReports'; 

	constructor(private readonly http: HttpClient) {
	    
	}

    getReports(): Observable<RsurReportModel[]> {
        //return this.http.get(`${this.ROUTE_PREFIX}?testDate=${testDate}`);
		return Observable.of(Reports_MOCK).delay(500);
    }

    getReport(rsurParticipTestId: number) {
        return this.http.get(`${this.ROUTE_PREFIX}/${rsurParticipTestId}`);
	}
}

const Reports_MOCK: RsurReportModel[] = [
	{
		RsurParticipCode: 12345,
		SchoolParticipInfo: {
			Surname: 'Fake1',
			Name: 'Fake1',
			SecondName: 'Fake1',
			SchoolName: '0000 - FakeSchool1'
		},
		TestStatus: 'зачет',
		TestNameWithDate: 'FakeTest1 - 01.01.1000',
		RsurParticipTestId: 1234,
		ExamName: 'FakeExam1'
	},
	{
		RsurParticipCode: 54321,
		SchoolParticipInfo: {
			Surname: 'Fake2',
			Name: 'Fake2',
			SecondName: 'Fake2',
			SchoolName: '0000 - FakeSchool2'
		},
		TestStatus: 'незачет',
		TestNameWithDate: 'FakeTest2 - 01.01.1000',
		RsurParticipTestId: 4321,
		ExamName: 'FakeExam2'
	},
	{
		RsurParticipCode: 32154,
		SchoolParticipInfo: {
			Surname: 'Fake3',
			Name: 'Fake3',
			SecondName: 'Fake3',
			SchoolName: '0000 - FakeSchool2'
		},
		TestStatus: 'отсутствовал',
		TestNameWithDate: 'FakeTest2 - 01.01.1000',
		RsurParticipTestId: 1233,
		ExamName: 'FakeExam1'
	}
]