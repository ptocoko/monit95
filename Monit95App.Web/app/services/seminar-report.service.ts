
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeminarReportModel } from '../components/rsur/seminar-reports/shared/seminar-report.model';

@Injectable()
export class SeminarReportService {
	constructor(private http: HttpClient){}
	
	postText(text: string) {
		return this.http.post('/api/rsur/seminarReports', { text });
	}

	postImages(images: File[], reportId: number) {
		let data: FormData = new FormData();
		images.forEach((val, i, arr) => data.append('image' + i, val, val.name));
		return this.http.post(`/api/rsur/seminarReports/${reportId}/files`, data, { responseType: 'text' });
	}

	getReportsList() {
		return this.http.get<SeminarReportModel[]>('/api/rsur/seminarReports');
	}

	getReport(reportId: number) {
		return this.http.get<SeminarReportModel>('/api/rsur/seminarReports/' + reportId)
	}
}
