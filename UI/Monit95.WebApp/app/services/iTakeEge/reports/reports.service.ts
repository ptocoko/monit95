import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportModel } from '../../../models/iTakeEge/reports/report.model';
import { ReportsInfo } from '../../../models/iTakeEge/reports/reports-info.model';
import { ReportsSearch } from '../../../models/iTakeEge/reports/reports-search.model';
import { ReportsListModel } from '../../../models/iTakeEge/reports/reports-list.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ReportsService {
	private readonly endpoint = 'api/itakeEge/reports';

	constructor(private http: HttpClient) { }

	getExtendReport(participTestId: number) {
		return this.http.get<ReportModel>(`${this.endpoint}/extend/${participTestId}`);
	}

	getReportsInfo(projectId: number) {
		return this.http.get<ReportsInfo>(`${this.endpoint}/info/${projectId}`);
	}

	getReportsList(search: ReportsSearch) {
		return this.http.get<ReportsListModel>(`${this.endpoint}`, { params: <any>search })
			.pipe(
				map(reports => {
					reports.Items.forEach(report => {
						switch (report.Grade5) {
							case 5:
								report.PassStatus = 'ЗАЧЕТ';
								break;
							case 2:
								report.PassStatus = 'НЕЗАЧЕТ';
								break;
							case -1:
								report.PassStatus = 'ОТСУТСТВОВАЛ';
								break;
							default:
								break;
						}
					});
					return reports;
				})
			)
	}
}