import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RsurReportModel, ReportsList } from '../models/rsur-report.model';
import { ReportsInfo } from '../models/rsur-reports-info.model';

@Injectable()
export class RsurReportService {
    private ROUTE_PREFIX = 'api/rsur/participReports'; 

	constructor(private readonly http: HttpClient) {
	    
	}

    getReports(page: string, length: string, search: string, schoolId: string, testCode: string, examName: string): Observable<ReportsList> {
		let params = new HttpParams();
		if (page) params = params.append('page', page);
		if (length) params = params.append('length', length);
		if (search) params = params.append('search', search);
		if (schoolId) params = params.append('schoolId', schoolId);
		if (testCode) params = params.append('testCode', testCode);
		if (examName) params = params.append('examName', examName);

		return this.http.get<ReportsList>(`${this.ROUTE_PREFIX}`, { params: params });
    }

	getReportsInfo(): Observable<ReportsInfo> {
		return this.http.get<ReportsInfo>(`${this.ROUTE_PREFIX}/info`);
	}

    getReport(rsurParticipTestId: number) {
        return this.http.get<RsurReportModel>(`${this.ROUTE_PREFIX}/${rsurParticipTestId}`);
	}
}