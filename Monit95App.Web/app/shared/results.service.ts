import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

const MOCK_RESULT = {
	Fio: 'Эсамбаев Хусайн Арбиевич',
	ClassName: '1 А',
	SchoolName: 'Школа крутости №1',
	PrimaryMark: 17,
	GradeGroup: 'Группа самых крутых',
	Marks: ['4', '1', '3', '1', '1']
};

@Injectable()
export class ResultsService {
	constructor (private http: Http) { }

	getClassParticipResult(participTestId: number) {
		//return this.http.get('/api/ResultReport/' + participTestId.toString());
		return Observable.of(MOCK_RESULT).map(MOCK => {
			return { ClassName: MOCK.ClassName + participTestId, ...MOCK}
		});
	}

	getClassParticipResultReport(participTestId: number) {
		return this.http.get('/api/ResultReport/Get?participTestId=' + participTestId);
	}
}