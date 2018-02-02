
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
		//return this.http.get<QuestionProtocolRead[]>(this.endpoint + 'questionProtocols');
		return Observable.of(questionResults).delay(500);
	}

	getProtocol(participTestId: number): Observable<QuestionProtocolEdit> {
		//return this.http.get<QuestionProtocolEdit>(`${this.endpoint}questionProtocols?participTestId=${participTestId}`);
		return Observable.of(questionResultsEdit).delay(500);
	}

	postMarksProtocol(postQuestionResults: QuestionProtocolPost[], participTestId: number) {
		//return this.http.post(`${this.endpoint}participsTests/${participTestId}/questionProtocols`, postQuestionResults, { responseType: 'text' });
		console.log(postQuestionResults);
		return Observable.of('hehe').delay(500);
	}

	putMarksProtocol(putQuestionResults: QuestionProtocolPut[]) {
		//return this.http.put(this.endpoint + 'questionResults', putQuestionResults, { responseType: 'text' });
		console.log(putQuestionResults);
		return Observable.of('hehe').delay(500);
	}

	//markAsAbsent(documNumber: number) {
	//	//return this.http.put(this.endpoint + participTestId + '/markAsAbsent', 'wasnot', { responseType: 'text' });
	//	mockParticipProtocol.find(f => f.DocumNumber === documNumber).Marks = 'wasnot';
	//	return Observable.of('heh');
	//}
}

let questionResults: QuestionProtocolRead[] = [
	{
		ParticipInfo: 'Esambaev Hus Arbievich',
		ParticipTestId: 17,
		QuestionMarks: '3;3;3;3;3;3;3;3'
	},
	{
		ParticipInfo: 'NeEsambaev NeHus NeArbievich',
		ParticipTestId: 18,
		QuestionMarks: null
	}
];

let questionResultsEdit: QuestionProtocolEdit = {
	ParticipInfo: 'Esambaev Hus Arbievich',
	MarkCollection: [
		{
			AwardedMark: 3,
			MaxMark: 3,
			Order: 1,
			QuestionMarkId: 1
		},
		{
			AwardedMark: 3,
			MaxMark: 3,
			Order: 2,
			QuestionMarkId: 2
		},
		{
			AwardedMark: 3,
			MaxMark: 3,
			Order: 3,
			QuestionMarkId: 3
		},
		{
			AwardedMark: 3,
			MaxMark: 3,
			Order: 4,
			QuestionMarkId: 4
		},
		{
			AwardedMark: 3,
			MaxMark: 3,
			Order: 5,
			QuestionMarkId: 5
		},
		{
			AwardedMark: 3,
			MaxMark: 3,
			Order: 6,
			QuestionMarkId: 6
		},
		{
			AwardedMark: 3,
			MaxMark: 3,
			Order: 7,
			QuestionMarkId: 7
		},
		{
			AwardedMark: 3,
			MaxMark: 3,
			Order: 8,
			QuestionMarkId: 8
		},
		{
			AwardedMark: 3,
			MaxMark: 3,
			Order: 9,
			QuestionMarkId: 9
		}
	]
}