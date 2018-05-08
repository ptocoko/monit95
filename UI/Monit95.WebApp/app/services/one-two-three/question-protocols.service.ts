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

	getAll(numberCode: string): Observable<ProtocolList[]> {
		//return this.http.get<ProtocolList[]>(`${this.endpoint}/${numberCode}`);
		return of([
			{
				ParticipTestId: 17,
				ParticipId: 177,
				ParticipFIO: 'Эсамбаев Хусайн Арбиевич',
				Marks: null,
				ClassId: '0201',
				ClassName: '2 А'
			},
			{
				ParticipTestId: 18,
				ParticipId: 178,
				ParticipFIO: 'Эсамбаев Хусс Арбиевич',
				Marks: '1;1;1;0;1;1;0;1;1;1;0;1',
				ClassId: '0202',
				ClassName: '2 Б'
			},
		]).pipe(delay(3000));
	}

	get(participTestId: number): Observable<QuestionProtocol> {
		//return this.http.get<QuestionProtocol>(`/api/onetwothree/protocol/${participTestId}`);
		return of({
			ParticipFIO: 'Эсамбаев Хусайн Арбиевич',
			QuestionMarks: [
				{
					Name: '1',
					MaxMark: 1,
				},
				{
					Name: '2',
					MaxMark: 2,
				},
				{
					Name: '3',
					MaxMark: 4,
				},
				{
					Name: '4',
					MaxMark: 4,
				},
				{
					Name: '5',
					MaxMark: 5,
				}
			]
		} as QuestionProtocol).pipe(delay(2000));
	}

	editMarks(participTestId: number, marks: QuestionResult[]): Observable<string> {
		return this.http.post(`${this.endpoint}/${participTestId}`, marks, { responseType: 'text' });
		//return of('hegh').pipe(delay(2000));
	}

	markAsAbsent(participTestId: number): Observable<string> {
		return this.http.put(`${this.endpoint}/${participTestId}/markAsAbsent`, null, { responseType: 'text' });
		//return of('hegh').pipe(delay(2000));
	}
}