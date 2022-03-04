import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ParticipModel, ParticipsList } from '../../models/one-two-three/particip.model';
import { HttpParams } from '@angular/common/http';

const endpoint = 'api/onetwothree/particips';

@Injectable()
export class ParticipService {

	constructor(private httpClient: HttpClient) { }

	getAll(options: GetAllOptions): Observable<ParticipsList> {
		let params = new HttpParams();
		if (options.page) params = params.append('page', options.page.toString());
		if (options.length) params = params.append('length', options.length.toString());
		if (options.search) params = params.append('search', options.search);
		if (options.classId) params = params.append('classid', options.classId);

		return this.httpClient.get<ParticipsList>(endpoint, { params });
	}

	get(participId: number): Observable<ParticipModel> {
		return this.httpClient.get<ParticipModel>(`${endpoint}/${participId}`);
	}

	update = (particip: ParticipModel): Observable<string> => {
		return this.httpClient.put(`${endpoint}/${particip.Id}`, particip, { responseType: 'text' });
	}

	post = (particip: ParticipModel): Observable<string> => {
		return this.httpClient.post(endpoint, particip, { responseType: 'text' });
	}

	deleteParticip(participId: number): Observable<string> {
		return this.httpClient.delete(`${endpoint}/${participId}`, { responseType: 'text' });
	}
}

export interface GetAllOptions {
	page?: number;
	length?: number;
	search?: string;
	classId?: string;
}