
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParticipProtocolModel } from '../models/particip-protocol.model';
import { QuestionResult } from '../models/marks-protocol.model';

@Injectable()
export class ParticipProtocolsService {
	endpoint = '/api/particip/protocols/';

	constructor(private http: HttpClient) { }

	getProtocolsList(projectId: number) {
		return this.http.get<ParticipProtocolModel[]>(this.endpoint + projectId);
	}

	getProtocol(documNumber: number) {
		return this.http.get<ParticipProtocolModel>(this.endpoint + documNumber);
	}

	postMarksProtocol(questionResults: QuestionResult[], documNumber: number) {
		return this.http.post(this.endpoint + documNumber, questionResults, { responseType: 'text' });
	}

	markAsAbsent(participTestId: number) {
		return this.http.put(this.endpoint + participTestId + '/markAsAbsent', 'wasnot', { responseType: 'text' });
	}
}
