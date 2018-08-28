import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProtocolGetModel } from '../../models/first-class/protocol-get.model';

@Injectable()
export class ProtocolsService {
	readonly endpoint = '/api/firstclass/protocols';

	constructor(private http: HttpClient) { }

	getAll(): Observable<ProtocolGetModel[]> {
		return this.http.get<ProtocolGetModel[]>(this.endpoint);
	}

	markAsAbsent(participTestId: number) {
		return this.http.put(`${this.endpoint}/${participTestId}/markAsAbsent`, { responseType: 'text' });
	}
}
