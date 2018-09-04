import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ActualizationService {
	private readonly endpoint = 'api/collectors';
	private readonly collectorId = 2;
	private status = true;

	constructor(private http: HttpClient) { }

	getActualizeStatus() {
		return this.http.get<CollectorModel>(`${this.endpoint}/${this.collectorId}`);
		//return of(this.status);
	}

	endActualization() {
		return this.http.put(`${this.endpoint}/${this.collectorId}`, { 'IsFinished': true }, { responseType: 'text' });
		//this.status = false;
		//return of(this.status);
	}
}

export interface CollectorModel {
	IsFinished: boolean;
}