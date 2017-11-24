
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';
import { MarksProtocol } from "../models/marks-protocol.model";
import { Subject } from "rxjs/Subject";

const protocolScanModel = {
	FileId: 123,
	Url: '/Images/rsur-scans/2090/1000/1.jpg',
	FileName: 'IMG_0001_01.JPG',
	StillHasScans: false
};

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
		}
	]
}

@Injectable()
export class RsurProtocolsService {
	constructor(private http: HttpClient) { }

	getScan(fileId: number) {
		return Observable.of(protocolScanModel).delay(2000);
	}

	getParticipTest(participCode: number) {
		if (participCode == 12345) {
			particip.QuestionResults.sort((first, second) => {
				if (first.Order < second.Order) {
					return -1;
				}
				else {
					return 1;
				}
			});

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
			
	}

	public postScan(file: File): Observable<number|HttpResponse<number>> {
		let url = '/api/ExcelFiles/Upload';
		let formData: FormData = new FormData();
		formData.append('image', file, file.name);

		var subject = new Subject<number|HttpResponse<number>>()
		const req = new HttpRequest('POST', url, formData, {
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
}
