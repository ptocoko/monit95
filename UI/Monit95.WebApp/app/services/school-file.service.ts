import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SchoolFileService {
    private ROUTE_PREFIX = 'api/schoolFiles'; 

	constructor(private readonly http: HttpClient) {
	    
	}

    getFiles() {
        return this.http.get(`${this.ROUTE_PREFIX}`);		
	} 

	//checkReportIsGot(reportId: number): Observable<boolean> {
	//	return this.http.get<boolean>(`${this.ROUTE_PREFIX}/isGot/${reportId}`);
	//}

	setReportIsGot(reportId: number) {
		return this.http.post(`${this.ROUTE_PREFIX}/isGot/${reportId}`, null, { responseType: 'text' });
	}
}