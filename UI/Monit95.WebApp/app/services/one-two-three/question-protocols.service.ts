import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProtocolList } from '../../models/one-two-three/protocol-list.model';
import { QuestionProtocol } from '../../models/one-two-three/question-protocol.model';
import { QuestionResult } from '../../models/marks-protocol.model';

@Injectable()
export class QuestionProtocolService {
	readonly endpoint = '/api/onetwothree/questionProtocols'

	constructor(private http: HttpClient) { }

	getAll() {
		return this.http.get<ProtocolList[]>(this.endpoint);
	}

	get(participTestId: number) {
		return this.http.get<QuestionProtocol>(`${this.endpoint}/${participTestId}`);
	}

	editMarks(participTestId: number, marks: QuestionResult[]) {
		return this.http.post(`${this.endpoint}/${participTestId}`, marks, { responseType: 'text' });
	}

	markAsAbsent(participTestId: number) {
		return this.http.put(`${this.endpoint}/${participTestId}/markAsAbsent`, null, { responseType: 'text' });
	}
}