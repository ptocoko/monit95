
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UploadReportService {
	constructor(private readonly http: HttpClient) { }

	post(data: FormData) {
		return this.http.post('/api/ExcelFiles/Upload', data);
	}
}
