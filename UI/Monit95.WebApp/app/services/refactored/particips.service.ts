import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ParticipModel } from '../../models/particip.model';

@Injectable()
export class ParticipsService {
	endpoint = '/api/particips';

	constructor(private http: HttpClient) { }

	getAll(projectId: number): Observable<ParticipModel[]> {
		return this.http.get<ParticipModel[]>(`${this.endpoint}/${projectId}`);
	}

	post(particip: ParticipModel, projectId: number): Observable<string> {
		return this.http.post(`${this.endpoint}/${projectId}`, particip, { responseType: 'text' });
	}

	delete(participId: number): Observable<string> {
		return this.http.delete(`${this.endpoint}/${participId}`, { responseType: 'text' });
	}
}