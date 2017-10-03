import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

const MOCK_RESULT = {
	ParticipTestId: 17,
	Surname: 'Эсамбаев',
	Name: 'Хусайн',
	SecondName: 'Арбиевич',
	ClassName: '1 А',
	SchoolName: 'Школа крутости №1',
	PrimaryMark: 17,
	GradeGroup: 'Группа самых крутых',
	Marks: ['2', '0.5', '0.5', '1', '0']
};

@Injectable()
export class ResultsService {
	constructor (private http: Http) { }

	getClassParticipResultDto(participTestId: number) {
		//return this.http.get('/api/ResultReport/' + participTestId.toString());
		return Observable.of(MOCK_RESULT).map(MOCK => MOCK);
	}

	getClassParticipResultReport(participTestId: number) {
		return this.http.get('/api/ResultReport/Get?participTestId=' + participTestId);
	}
}