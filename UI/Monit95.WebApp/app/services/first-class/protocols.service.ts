import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProtocolGetModel, ProtocolsList } from '../../models/first-class/protocol-get.model';
import { ProtocolPostModel } from '../../models/first-class/protocol-post.model';

@Injectable()
export class ProtocolsService {
	readonly endpoint = '/api/firstclass/protocols';

	constructor(private http: HttpClient) { }

	getAll(options: ListGetOptions): Observable<ProtocolsList> {
		let params = new HttpParams();
		if (options.page) params = params.append('page', options.page.toString());
		if (options.length) params = params.append('length', options.length.toString());
		if (options.search) params = params.append('search', options.search);
		if (options.classId) params = params.append('classid', options.classId);

		return this.http.get<ProtocolsList>(this.endpoint, { params });
	}

	get(participTestId: number): Observable<ProtocolPostModel> {
		return this.http.get<ProtocolPostModel>(`${this.endpoint}/${participTestId}`);
	}

	edit(participTestId: number, protocol: ProtocolPostModel) {
		return this.http.post(`${this.endpoint}/${participTestId}`, protocol, { responseType: 'text' });
	}

	markAsAbsent(participTestId: number) {
		return this.http.put<string>(`${this.endpoint}/${participTestId}/markAsAbsent`, { responseType: 'text' });
	}
}

export interface ListGetOptions {
	page?: number;
	length?: number;
	search?: string;
	classId?: string;
}