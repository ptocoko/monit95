import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportModel } from '../../../models/iTakeEge/reports/report.model';
import { ReportsInfo } from '../../../models/iTakeEge/reports/reports-info.model';
import { ReportsSearch } from '../../../models/iTakeEge/reports/reports-search.model';
import { ReportsListModel } from '../../../models/iTakeEge/reports/reports-list.model';

@Injectable()
export class ReportsService {
	private readonly endpoint = 'api/itakeEge/reports';

	constructor(private http: HttpClient) { }

	getExtendReport(participTestId: number) {
		return this.http.get<ReportModel>(`${this.endpoint}/extend/${participTestId}`);
	}

	getReportsInfo(projectTestId: number) {
		return this.http.get<ReportsInfo>(`${this.endpoint}/info/${projectTestId}`);
	}

	getReportsList(search: ReportsSearch) {
		return this.http.get<ReportsListModel>(`${this.endpoint}`, { params: <any>search });
	}
}