import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ParticipGetModel, ParticipsList } from '../../models/first-class/particip-get.model';
import { HttpParams } from '@angular/common/http';
import { ParticipPostModel } from '../../models/first-class/particip-post.model';

const endpoint = 'api/firstclass/particips';

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

	get(participId: number): Observable<ParticipGetModel> {
		return this.httpClient.get<ParticipGetModel>(`${endpoint}/${participId}`);
	}

	update(particip: ParticipPostModel): Observable<string> {
		return this.httpClient.put(`${endpoint}/${particip.Id}`, particip, { responseType: 'text' });
	}

	post(particip: ParticipPostModel): Observable<string> {
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