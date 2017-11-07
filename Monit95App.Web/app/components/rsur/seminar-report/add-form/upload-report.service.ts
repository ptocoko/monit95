import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ReportsListModel } from "../reports-list.component";

@Injectable()
export class UploadReportService {
	constructor(private readonly http: HttpClient) { }

	
}
