import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ReportService {
    private ROUTE_PREFIX = 'api/rsur/participReports'; 

	constructor(private readonly http: Http) {
	    
	}

    getReports(testDate: string) {
        return this.http.get(`${this.ROUTE_PREFIX}?testDate=${testDate}`);		
    }

    getReport(rsurParticipTestId: number) {
        return this.http.get(`${this.ROUTE_PREFIX}/${rsurParticipTestId}`);
    }
}