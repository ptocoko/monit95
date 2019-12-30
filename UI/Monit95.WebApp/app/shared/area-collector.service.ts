import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CollectorModel } from '../models/collector.model';
import { Collector } from './collector.interface';

const AREA_COLLECTOR_API: string = '/api/area-collectors'

@Injectable()
export class AreaCollectorService implements Collector {
	constructor(public http: HttpClient) { }

	getCollectorState(collectorId: number): Observable<CollectorModel> {
		return this.http.get<CollectorModel>(AREA_COLLECTOR_API + `/${collectorId}`);
	}

	isFinished(collectorId: number, isFinished: boolean): Observable<string> {
		return this.http.put(AREA_COLLECTOR_API + `/${collectorId}`, { isFinished }, { responseType: 'text' });
	}
}