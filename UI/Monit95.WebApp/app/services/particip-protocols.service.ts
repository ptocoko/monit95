
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParticipProtocolModel } from '../models/particip-protocol.model';
import { QuestionResult } from '../models/marks-protocol.model';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../shared/constants';
import { QuestionProtocolRead } from '../models/question-protocol-read.model';
import { QuestionProtocolEdit, QuestionMarkEdit } from '../models/question-protocol-edit.model';
import { QuestionProtocolPost } from '../models/question-protocol-post.model';
import { QuestionProtocolPut } from '../models/question-protocol-put.model';

@Injectable()
export class ParticipProtocolsService {
	endpoint = '/api/iTakeEge/';

	constructor(private http: HttpClient) { }

	getProtocolsList(): Observable<QuestionProtocolRead[]> {
		return this.http.get<QuestionProtocolRead[]>(this.endpoint + 'questionProtocols');
	}

	getProtocol(participTestId: number): Observable<QuestionProtocolEdit> {
		return this.http.get<QuestionProtocolEdit>(`${this.endpoint}questionProtocols?participTestId=${participTestId}`);
	}

	postMarksProtocol(postQuestionResults: { [key: number]: number; }, participTestId: number) {
		return this.http.post(`${this.endpoint}participTests/${participTestId}/questionProtocols`, postQuestionResults, { responseType: 'text' });
	}

	//putMarksProtocol(putQuestionResults: QuestionProtocolPut[]) {
	//	return this.http.put(this.endpoint + 'questionResults', putQuestionResults, { responseType: 'text' });
	//	//console.log(putQuestionResults);
	//	//return Observable.of('hehe').delay(500);
	//}

	markAsAbsent(participTestId: number) {
		return this.http.put(`${this.endpoint}participTests/${participTestId}`, 'wasnot', { responseType: 'text' });
	}
}
