
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';
import { MarksProtocol } from "../models/marks-protocol.model";
import { Subject } from "rxjs/Subject";
import { Scan, AnswerSheet } from "../models/scan.model";


@Injectable()
export class RsurProtocolsService {
	constructor(private http: HttpClient) { }

	marksProtocolUrl = '/api/rsur/marksProtocols';
	scansUrl = '/api/rsur/scans';

	private sortFunc<T>(first: T|any, second: T|any) {
		if (first.Order < second.Order) {
			return -1;
		}
		else {
			return 1;
		}
	}

	getMarksProtocol(participCode: number): Observable<MarksProtocol> {
		if (participCode == 12345) {
			particip.QuestionResults.sort(this.sortFunc);
			return Observable.of(particip).delay(2000);
		}
		else
		{
			let message: string;
			if (participCode == 12365)
				message = 'i error that here'
			else
				message = 'sadfasdfa'

			return new Observable(observer => {
				setTimeout(() => {
					observer.error(message)
				}, 1500)
			});
		}

		//return this.http.get<MarksProtocol>(this.url).map(s => {
		//	s.QuestionResults.sort(this.sortFunc);
		//	return s;
		//});
	}
	
	postMarksProtocol(marksProtocol: MarksProtocol) {
		if (!marksProtocol.FileId) {
			console.error('need to attach fileId to the marksProtocol object')
			return Observable.throw('there is no fileId')
		}
		else {
			//return this.http.post(this.marksProtocolUrl, marksProtocol, { responseType: 'text' });
		}
	}

	getScan(fileId: number) {
		return Observable.of(protocolScanModel).delay(2000);

		//return this.http.get<Scan>(`${this.scansUrl}/${fileId}`);
	}

	public getAnswerSheets() {
		return Observable.of(answerSheets).delay(2000);

		//return this.http.get<AnswerSheet[]>(`${this.scansUrl}`);
	}

	public postScan(file: File): Observable<number|HttpResponse<number>> {
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

	public deleteScan(fileId: number) {
		return Observable.of({}).delay(1000);

		//return this.http.delete(`${this.scansUrl}/${fileId}`);
	}
	
	deleteTestResult(participTestId: number) {
		return Observable.of({}).delay(1000);
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
		Marks: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0',
		SourceName: 'IMG_002.JPG',
		FileId: 1234
	},
	{
		ParticipCode: 54321,
		TestName: '0101 — Орфография',
		Marks: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0',
		SourceName: 'IMG_001.JPG',
		FileId: 4321
	},
	{
		SourceName: 'IMG_004.JPG',
		FileId: 6431
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


