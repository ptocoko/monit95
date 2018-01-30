
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParticipProtocolModel } from '../models/particip-protocol.model';
import { QuestionResult } from '../models/marks-protocol.model';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../shared/constants';

@Injectable()
export class ParticipProtocolsService {
	endpoint = '/api/particip/protocols/';

	constructor(private http: HttpClient) { }

	getProtocolsList(projectId: number) {
		//return this.http.get<ParticipProtocolModel[]>(this.endpoint + projectId);
		return Observable.of(mockParticipProtocol);
	}

	getProtocol(documNumber: number) {
		//return this.http.get<ParticipProtocolModel>(this.endpoint + documNumber);
		return Observable.of(mockParticipProtocol.find(f => f.DocumNumber === documNumber)).map(protocol => {
			protocol.QuestionResults.sort(Constant.questionResultsSortFunc);
			return protocol;
		})
	}

	postMarksProtocol(questionResults: QuestionResult[], documNumber: number) {
		//return this.http.post(this.endpoint + documNumber, questionResults, { responseType: 'text' });
		let protocol = mockParticipProtocol.find(f => f.DocumNumber === documNumber);
		protocol.QuestionResults = questionResults;
		protocol.Marks = questionResults.map(m => m.CurrentMark).join(';');
		return Observable.of('hoho');
	}

	markAsAbsent(documNumber: number) {
		//return this.http.put(this.endpoint + participTestId + '/markAsAbsent', 'wasnot', { responseType: 'text' });
		mockParticipProtocol.find(f => f.DocumNumber === documNumber).Marks = 'wasnot';
		return Observable.of('heh');
	}
}

let mockParticipProtocol: ParticipProtocolModel[] = [
	{
		Id: 1,
		ParticipTestId: 11,
		Surname: 'test1',
		Name: 'test',
		SecondName: 'testtest',
		ProjectId: 12,
		Birthday: '12.11.2010',
		ClassName: '2a',
		SchoolId: '0005',
		SchoolName: 'Президенсткая шк',
		DocumNumber: 12345,
		SourceName: 'Школа',
		Marks: '1;2;1;2;3;1;1;0',
		QuestionResults: [
			{
				Name: '1.1',
				Order: 1,
				MaxMark: 3,
				CurrentMark: 1
			},
			{
				Name: '1.3',
				Order: 3,
				MaxMark: 3,
				CurrentMark: 1
			},
			{
				Name: '1.2',
				Order: 2,
				MaxMark: 3,
				CurrentMark: 2
			},
			{
				Name: '2.1',
				Order: 4,
				MaxMark: 3,
				CurrentMark: 2
			},
			{
				Name: '2.2',
				Order: 5,
				MaxMark: 3,
				CurrentMark: 3
			},
			{
				Name: '3',
				Order: 6,
				MaxMark: 3,
				CurrentMark: 1
			},
			{
				Name: '4.1',
				Order: 7,
				MaxMark: 3,
				CurrentMark: 1
			},
			{
				Name: '5',
				Order: 8,
				MaxMark: 3,
				CurrentMark: 0
			}
		]
	},
	{
		Id: 2,
		ParticipTestId: 12,
		Surname: 'test1',
		Name: 'test',
		SecondName: 'testtest',
		ProjectId: 12,
		Birthday: '12.11.2010',
		ClassName: '2a',
		SchoolId: '0005',
		SchoolName: 'Президенсткая шк',
		DocumNumber: 54321,
		SourceName: 'РЦОИ',
		Marks: null,
		QuestionResults: [
			{
				Name: '1.1',
				Order: 1,
				MaxMark: 3,
				CurrentMark: null
			},
			{
				Name: '1.3',
				Order: 3,
				MaxMark: 3,
				CurrentMark: null
			},
			{
				Name: '1.2',
				Order: 2,
				MaxMark: 3,
				CurrentMark: null
			},
			{
				Name: '2.1',
				Order: 4,
				MaxMark: 3,
				CurrentMark: null
			},
			{
				Name: '2.2',
				Order: 5,
				MaxMark: 3,
				CurrentMark: null
			},
			{
				Name: '3',
				Order: 6,
				MaxMark: 3,
				CurrentMark: null
			},
			{
				Name: '4.1',
				Order: 7,
				MaxMark: 3,
				CurrentMark: null
			},
			{
				Name: '5',
				Order: 8,
				MaxMark: 3,
				CurrentMark: null
			}
		]
	},
	{
		Id: 3,
		ParticipTestId: 13,
		Surname: 'test1',
		Name: 'test',
		SecondName: 'testtest',
		ProjectId: 12,
		Birthday: '12.11.2010',
		ClassName: '2a',
		SchoolId: '0005',
		SchoolName: 'Президенсткая шк',
		DocumNumber: 98765,
		SourceName: 'Школа',
		Marks: '1;2;1;2;3;1;1;0',
		QuestionResults: [
			{
				Name: '1.1',
				Order: 1,
				MaxMark: 3,
				CurrentMark: 1
			},
			{
				Name: '1.3',
				Order: 3,
				MaxMark: 3,
				CurrentMark: 1
			},
			{
				Name: '1.2',
				Order: 2,
				MaxMark: 3,
				CurrentMark: 2
			},
			{
				Name: '2.1',
				Order: 4,
				MaxMark: 3,
				CurrentMark: 2
			},
			{
				Name: '2.2',
				Order: 5,
				MaxMark: 3,
				CurrentMark: 3
			},
			{
				Name: '3',
				Order: 6,
				MaxMark: 3,
				CurrentMark: 1
			},
			{
				Name: '4.1',
				Order: 7,
				MaxMark: 3,
				CurrentMark: 1
			},
			{
				Name: '5',
				Order: 8,
				MaxMark: 3,
				CurrentMark: 0
			}
		]
	}
]