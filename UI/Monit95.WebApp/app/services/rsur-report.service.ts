import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RsurReportModel } from '../models/rsur-report.model';

@Injectable()
export class RsurReportService {
    private ROUTE_PREFIX = 'api/rsur/participReports'; 

	constructor(private readonly http: HttpClient) {
	    
	}

    getReports(): Observable<RsurReportModel[]> {
        return this.http.get<RsurReportModel[]>(`${this.ROUTE_PREFIX}`);
    }

    getReport(rsurParticipTestId: number) {
        return this.http.get<RsurReportModel>(`${this.ROUTE_PREFIX}/${rsurParticipTestId}`);
	}
}