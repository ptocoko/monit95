import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportModel } from '../../models/iTakeEge/reports.model';

@Injectable()
export class ReportsService {
	private readonly endpoint = 'api/itakeEge/reports';

	constructor(private http: HttpClient) { }

	getExtendReport(participTestId: number) {
		return this.http.get<ReportModel>(`${this.endpoint}/${participTestId}`);
	}
}