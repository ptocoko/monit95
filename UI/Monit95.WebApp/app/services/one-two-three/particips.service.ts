import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ParticipModel } from '../../models/one-two-three/particip.model';

const endpoint = 'api/onetwothree/particips';

@Injectable()
export class ParticipService {

	constructor(private httpClient: HttpClient) { }

	getAll(): Observable<ParticipModel[]> {
		return this.httpClient.get<ParticipModel[]>(endpoint);
	}

	get(participId: number): Observable<ParticipModel> {
		return this.httpClient.get<ParticipModel>(`${endpoint}/${participId}`);
	}

	update(particip: ParticipModel): Observable<string> {
		return this.httpClient.put(`${endpoint}/${particip.Id}`, particip, { responseType: 'text' });
	}

	post(particip: ParticipModel): Observable<string> {
		return this.httpClient.post(endpoint, particip, { responseType: 'text' });
	}

	deleteParticip(participId: number): Observable<string> {
		return this.httpClient.delete(`${endpoint}/${participId}`, { responseType: 'text' });
	}
}