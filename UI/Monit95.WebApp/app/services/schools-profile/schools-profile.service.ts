import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileQuestion, Session } from '../../models/schools-profile/profile-question.model';

@Injectable()
export class SchoolsProfileService {
	endpoint = '/api/schools-profile';

	constructor(private http: HttpClient) { }

	getQuestions(id: number) {
		return this.http.get<ProfileQuestion[]>(this.endpoint + '/' + id);
	}

	saveAnswer(questionId: number, value: number, session?: Session) {
		return this.http.post(this.endpoint + '/' + questionId, { value, session }, { responseType: "text" });
	}
}