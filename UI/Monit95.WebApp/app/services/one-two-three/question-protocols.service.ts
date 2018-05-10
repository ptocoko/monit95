import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProtocolList } from '../../models/one-two-three/protocol-list.model';
import { QuestionProtocol } from '../../models/one-two-three/question-protocol.model';
import { QuestionResult } from '../../models/marks-protocol.model';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators/delay';

@Injectable()
export class QuestionProtocolService {
	readonly endpoint = '/api/onetwothree/protocols'

	constructor(private http: HttpClient) { }

	getAll(projectTestId: number): Observable<ProtocolList[]> {
		return this.http.get<ProtocolList[]>(`${this.endpoint}/${projectTestId}`);
	}

	get(participTestId: number): Observable<QuestionProtocol> {
		return this.http.get<QuestionProtocol>(`/api/onetwothree/protocol/${participTestId}`);
	}

	editMarks(participTestId: number, marks: QuestionResult[]): Observable<string> {
		return this.http.post(`${this.endpoint}/${participTestId}`, marks, { responseType: 'text' });
	}

	markAsAbsent(participTestId: number): Observable<string> {
		return this.http.put(`${this.endpoint}/${participTestId}/markAsAbsent`, null, { responseType: 'text' });
	}
}