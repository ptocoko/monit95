import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CollectorModel } from '../models/collector.model';
import { Collector } from './collector.interface';

const SCHOOL_COLLECTOR_API: string = '/api/school-collectors'

@Injectable()
export class SchoolCollectorService implements Collector {
	constructor(public http: HttpClient) { }

	getCollectorState(collectorId: number): Observable<CollectorModel> {
		return this.http.get<CollectorModel>(SCHOOL_COLLECTOR_API + `/${collectorId}`);
	}

	isFinished(collectorId: number, isFinished: boolean) {
		return this.http.put(SCHOOL_COLLECTOR_API + `/${collectorId}`, { isFinished }, { responseType: 'text' });
	}
}