import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProtocolGetModel } from '../../models/first-class/protocol-get.model';
import { ProtocolPostModel } from '../../models/first-class/protocol-post.model';

@Injectable()
export class ProtocolsService {
	readonly endpoint = '/api/firstclass/protocols';

	constructor(private http: HttpClient) { }

	getAll(): Observable<ProtocolGetModel[]> {
		return this.http.get<ProtocolGetModel[]>(this.endpoint);
	}

	get(participTestId: number): Observable<ProtocolPostModel> {
		return this.http.get<ProtocolPostModel>(`${this.endpoint}/${participTestId}`);
	}

	edit(participTestId: number, protocol: ProtocolPostModel) {
		return this.http.post(`${this.endpoint}/${participTestId}`, protocol, { responseType: 'text' });
	}

	markAsAbsent(participTestId: number) {
		return this.http.put(`${this.endpoint}/${participTestId}/markAsAbsent`, { responseType: 'text' });
	}
}
