
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ReportsListModel } from "../components/rsur/seminar-report/reports-list.component";

@Injectable()
export class SeminarReportService {
	constructor(private http: HttpClient){}
	
	postText(text: string) {
		return this.http.post('/api/rsur/reports', { text });
	}

	postImages(images: File[], reportId: number) {
		let data: FormData = new FormData();
		images.forEach((val, i, arr) => data.append('image' + i, val, val.name));
		return this.http.post(`/api/rsur/reports/${reportId}/files`, data, { responseType: 'text' });
	}

	getReportsList() {
		return this.http.get<ReportsListModel[]>('/api/rsur/reports');
	}
}
