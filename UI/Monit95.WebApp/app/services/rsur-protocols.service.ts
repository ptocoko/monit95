
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';
import { MarksProtocol } from "../models/marks-protocol.model";
import { Subject } from "rxjs/Subject";
import { Scan, AnswerSheet } from "../models/scan.model";
import { Protocol } from "../models/protocol.model";


@Injectable()
export class RsurProtocolsService {
	constructor(private http: HttpClient) { }

	private marksProtocolUrl = '/api/rsur/marksProtocols';
	private scansUrl = '/api/rsur/scans';

	private sortFunc<T>(first: T|any, second: T|any) {
		if (first.Order < second.Order) {
			return -1;
		}
		else {
			return 1;
		}
	}
	
	/**
	 * Возвращает протокол по коду участника
	 * @param participCode код участника
	 * @returns Observable<MarksProtocol>
	 */
	getMarksProtocol(participCode: number): Observable<MarksProtocol> {
		if (participCode == 12345) {
			particip.QuestionResults.sort(this.sortFunc);
			return Observable.of({ ...particip }).delay(500);
		}
		else
		{
			let error: any;
			if (participCode == 12365)
				error = {
					message: 'i error that here'
				}
			else
				error = {
					message: 'sadfasdfa'
				} 

			return new Observable(observer => {
				setTimeout(() => {
					observer.error(error)
				}, 500)
			});
		}

		//return this.http.get<MarksProtocol>(this.url).map(s => {
		//	s.QuestionResults.sort(this.sortFunc);
		//	return s;
		//});
	}

	/**
	 * Возвращает протокол по fileId
	 * @param participCode код участника
	 * @returns Observable<MarksProtocol>
	 */
	getMarksProtocolByFileId(fileId: number) {
		if (fileId === 6431) {
			return Observable.of({ ...particip }).delay(500);
		}
		else {
			return Observable.of(null).delay(500);
		}
		//return this.http.get('/api/ExcelFiles/Upload').map(res => {
		//	let marksProtocol = res as MarksProtocol;
		//	if (marksProtocol) {
		//		marksProtocol.QuestionResults.sort(this.sortFunc);
		//		return marksProtocol;
		//	}
		//	else {
		//		return null;
		//	}
		//});
	}

	getQuestionProtocols() {
		return Observable.of(questionProtocols)
			.map(s => {
				s.forEach(val => {
					if (val.RsurQuestionValues === 'wasnot')
						val.RsurQuestionValues = 'отсутствовал';
				});
				return s;
			})
			.delay(500);
	}

	postMarksProtocol(marksProtocol: MarksProtocol) {
		console.log('im post your marks');
		return Observable.of(null).delay(500);
		//return this.http.post(this.marksProtocolUrl, marksProtocol, { responseType: 'text' });
	}

	markAsAbsent(participTestId: number) {
		console.log('i mark this particip as absent')
		return Observable.of(null).delay(500);

		//return this.http.put(this.marksProtocolUrl, participTestId, { responseType: 'text' });
	}

	getScan(fileId: number) {
		return Observable.of(protocolScanModel).delay(500);

		//return this.http.get<Scan>(`${this.scansUrl}/${fileId}`);
	}

	getAnswerSheets() {
		return Observable.of(answerSheets).delay(500);

		//return this.http.get<AnswerSheet[]>(`${this.scansUrl}`);
	}

	postScan(file: File): Observable<number|HttpResponse<number>> {
		let fakeUrl = '/api/ExcelFiles/Upload';

		let formData: FormData = new FormData();
		formData.append('image', file, file.name);

		var subject = new Subject<number|HttpResponse<number>>()
		const req = new HttpRequest('POST', fakeUrl, formData, {
			reportProgress: true,
			responseType: 'text'
		});

		this.http.request(req).subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				const percentDone = Math.round(100 * event.loaded / event.total);
				subject.next(percentDone);
			} else if (event instanceof HttpResponse) {
				subject.next(event as HttpResponse<number>);
				subject.complete();
			}
		}, error => subject.error(error));
		return subject.asObservable();
	}

	deleteScan(fileId: number) {
		return Observable.of({}).delay(1000);

		//return this.http.delete(`${this.scansUrl}/${fileId}`);
	}
}

const protocolScanModel: Scan = {
	FileId: 123,
	Url: '/Images/rsur-scans/2090/1000/1.jpg',
	SourceName: 'IMG_0001_01.JPG'
};

const scans: Scan[] = [
	{
		SourceName: 'IMG_001.JPG',
		FileId: 1234
	},
	{
		SourceName: 'IMG_002.JPG',
		FileId: 1234
	},
]

const answerSheets: AnswerSheet[] = [
	{
		ParticipCode: 12345,
		TestName: '0104 — Речь && Языковые нормы && Выразительность речи',
		RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0',
		SourceName: 'IMG_002.JPG',
		FileId: 1234
	},
	{
		ParticipCode: 54321,
		TestName: '0101 — Орфография',
		RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0',
		SourceName: 'IMG_001.JPG',
		FileId: 4321
	},
	{
		SourceName: 'IMG_004.JPG',
		FileId: 6431
	},
]

const questionProtocols: Protocol[] = [
	{
		ParticipCode: 12345,
		ParticipTestId: 1234,
		TestName: '0104 — Речь && Языковые нормы && Выразительность речи',
		RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0'
	},
	{
		ParticipCode: 54321,
		ParticipTestId: 4321,
		TestName: '0101 — Орфография',
		RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1'
	},
	{
		ParticipCode: 89906,
		ParticipTestId: 2435,
		TestName: '0104 — Речь && Языковые нормы && Выразительность речи',
		RsurQuestionValues: 'wasnot'
	},
	{
		ParticipCode: 23451,
		ParticipTestId: 9367,
		TestName: '0102 — Пунктуация'
	},
]

const particip: MarksProtocol = {
	"ParticipCode": 12345,
	"ParticipTestId": 1234,
	"TestName": "0104 — Речь && Языковые нормы && Выразительность речи",
	"QuestionResults": [
		{
			"Name": "1.1",
			"Order": 1,
			"MaxMark": 4,
			"CurrentMark": null
		},
		{
			"Name": "3.2",
			"Order": 4,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "2.10",
			"Order": 2,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.1",
			"Order": 3,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.2",
			"Order": 4,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "2.10",
			"Order": 2,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.1",
			"Order": 3,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.2",
			"Order": 4,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "2.10",
			"Order": 2,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.1",
			"Order": 3,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.2",
			"Order": 4,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "2.10",
			"Order": 2,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.1",
			"Order": 3,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.2",
			"Order": 4,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "2.10",
			"Order": 2,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.1",
			"Order": 3,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.2",
			"Order": 4,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "2.10",
			"Order": 2,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.1",
			"Order": 3,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.2",
			"Order": 4,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "2.10",
			"Order": 2,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.1",
			"Order": 3,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.2",
			"Order": 4,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "2.10",
			"Order": 2,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.1",
			"Order": 3,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.2",
			"Order": 4,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "2.10",
			"Order": 2,
			"MaxMark": 1,
			"CurrentMark": null
		},
		{
			"Name": "3.1",
			"Order": 3,
			"MaxMark": 1,
			"CurrentMark": null
		}
	]
}


