import { Observable } from 'rxjs/Observable';
import { CollectorModel } from '../models/collector.model';

export interface Collector {
	getCollectorState(collectorId: number): Observable<CollectorModel>;
	isFinished(collectorId: number, isFinished: boolean): Observable<string>;
}