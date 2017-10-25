
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { RsurReportModel } from "../report/rsur-report.model";
import { RsurResultModel } from "./rsur-result.model";

const MOCK_REPORT: RsurReportModel = {
	Code: 15204,
	Surname: 'Эсамбаев',
	Name: 'Хусайн',
	SecondName: 'Арбиевич',
	SchoolName: 'Школа Крутости',
	TestNameWithDate: 'Экзамен на крутость, 17.11.2017',
	IsPassTest: true,
	TestDate: '17.11.2017',
	TestNumberCodeWithName: '0101 — Экзамен на крутость',
	EgeQuestionResults: [
		{
			EgeQuestionNumber: 1,
			RsurQuestionNumbers: '1.1; 1.2; 1.3',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости',
			Value: 59
		},
		{
			EgeQuestionNumber: 2,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4; 2.5; 2.6; 2.7; 2.8; 2.9; 2.10',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости',
			Value: 80
		},
		{
			EgeQuestionNumber: 3,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
			Value: 60
		},
		{
			EgeQuestionNumber: 4,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
			Value: 81
		},
		{
			EgeQuestionNumber: 3,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
			Value: 61
		},
		{
			EgeQuestionNumber: 3,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
			Value: 70
		},
		{
			EgeQuestionNumber: 3,
			RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
			ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
			Value: 70
		}
	]
}

const MOCK_RESULTS: RsurResultModel[] = [
	{
		Code: 10984,
		Surname: 'Эсамбаев',
		Name: 'Хусайн',
		SecondName: 'Арбиевич',
		SchoolName: 'Школа крутости',
		IsPassTest: true,
		RsurTestId: 1084
	},
	{
		Code: 10985,
		Surname: 'Эсамбаев',
		Name: 'Хусайн',
		SecondName: 'Арбиевич',
		SchoolName: 'Школа крутости',
		IsPassTest: true,
		RsurTestId: 1085
	},
	{
		Code: 10986,
		Surname: 'Эсамбаев',
		Name: 'Хусайн',
		SecondName: 'Арбиевич',
		SchoolName: 'Школа крутости',
		IsPassTest: true,
		RsurTestId: 1086
	}
];

const MOCK_TESTS = [
	{ Id: 1084, Name: 'Орфография' },
	{ Id: 1085, Name: 'Пунктуация' },
	{ Id: 1086, Name: 'Алгебра' }
];



@Injectable()
export class RsurResultsService {
	constructor(private http: Http) { }

	getReport(): Observable<RsurReportModel> {
		return Observable.of(MOCK_REPORT)
	}

	getResultsList() {
		return Observable.of(MOCK_RESULTS);
	}

	getTests() {
		return Observable.of(MOCK_TESTS);
	}
}
