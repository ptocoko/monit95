import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UploadReportService {
	constructor(private readonly http: HttpClient) {
		console.log('hey yo!')
	}

	postText(text: string) {
		return this.http.post('/api/rsur/reports', { text });
	}

	postImages(images: File[], reportId: number) {
		let data: FormData = new FormData();
		images.forEach((val, i, arr) => data.append('image' + i, val, val.name));
		return this.http.post(`/api/rsur/reports/${reportId}/files`, data);
	}
}
