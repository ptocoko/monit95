import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ActualizationService {
	private readonly endpoint = 'api/actualization'
	private status = true;

	constructor(private http: HttpClient) { }

	getActualizeStatus() {
		//return this.http.get<boolean>(`${this.endpoint}/status`);
		return of(this.status);
	}

	endActualization() {
		//return this.http.put(`${this.endpoint}/status`, { 'status': ActualizationStatuses['Актуализация окончена'] }, { responseType: 'text' });
		this.status = false;
		return of(this.status);
	}
}

export enum ActualizationStatuses {
	'Актуализация окончена' = 0,
	'Актуализация не окончена' = 1
}