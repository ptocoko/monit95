import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

const SCHOOL_COLLECTOR_API: string = '/api/collectors'

@Injectable()
export class SchoolCollectorService {
	constructor(public http: HttpClient) { }

	getSchoolCollectorState(collectorId: number): Observable<SchoolCollectorModel> {
		return this.http.get<SchoolCollectorModel>(SCHOOL_COLLECTOR_API + `/${collectorId}`);
	}

	isFinished(collectorId: number, isFinished: boolean) {
		return this.http.put(SCHOOL_COLLECTOR_API + `/${collectorId}`, { isFinished }, { responseType: 'text' });
	}
}

export interface SchoolCollectorModel {
	IsFinished: boolean;
}