import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { ReportsListModel } from "../components/rsur/seminar-report/reports-list.component";

@Injectable()
export class RsurReportService {
    private ROUTE_PREFIX = 'api/rsur/participReports'; 

	constructor(private readonly http: Http, private readonly _http: HttpClient) {
	    
	}

    getReports(testDate: string) {
        return this.http.get(`${this.ROUTE_PREFIX}?testDate=${testDate}`);		
    }

    getReport(rsurParticipTestId: number) {
        return this.http.get(`${this.ROUTE_PREFIX}/${rsurParticipTestId}`);
	}

	postSeminarText(text: string) {
		return this._http.post('/api/rsur/reports', { text });
	}

	postSeminarImages(images: File[], reportId: number) {
		let data: FormData = new FormData();
		images.forEach((val, i, arr) => data.append('image' + i, val, val.name));
		return this._http.post(`/api/rsur/reports/${reportId}/files`, data, { responseType: 'text' });
	}

	getSeminarReportsList() {
		return this._http.get<ReportsListModel[]>('/api/rsur/reports');
	}
}