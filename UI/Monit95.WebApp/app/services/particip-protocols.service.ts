
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParticipProtocolModel } from '../models/particip-protocol.model';
import { Protocol } from '../models/protocol.model';

@Injectable()
export class ParticipProtocolsService {
	endpoint = '/api/particip/protocols/';

	constructor(private http: HttpClient) { }

	getProtocols(projectId: number) {
		return this.http.get<ParticipProtocolModel[]>(this.endpoint);
	}

	markAsAbsent(participTestId: number) {
		return this.http.put(this.endpoint + participTestId + '/markAsAbsent', 'wasnot', { responseType: 'text' });
	}
}
