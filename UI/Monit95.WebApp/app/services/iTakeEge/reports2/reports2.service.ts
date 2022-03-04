import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISchoolReport } from '../../../models/iTakeEge/reports2/ISchoolReport';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Reports2Service {
	endpoint = 'api/itakeEge/reports2'

	constructor(private http: HttpClient) { }

	getSchoolsReports(projectTestId: number): Observable<ISchoolReport[]> {
		return this.http.get<ISchoolReport[]>(this.endpoint + '/schools', { params: { 'projectTestId': projectTestId.toString() }});
	}
}