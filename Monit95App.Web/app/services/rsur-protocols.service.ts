
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { ParticipTestModel } from "../models/particip-test.model";

const protocolScanModel = {
	FileId: 123,
	Url: '/Images/rsur-scans/2090/1000/1.jpg',
	FileName: 'IMG_0001_01.JPG',
	StillHasScans: false
};

const particip: ParticipTestModel = {
	"ParticipCode": 12345,
	"ParticipTest": {
		"ParticipTestId": 1234,
		"TestName": "0101-Орфография",
		"Questions": [
			{
				"Name": "1",
				"Order": 1,
				"MaxMark": 4,
				"CurrentMark": 0
			},
			{
				"Name": "3.2",
				"Order": 4,
				"MaxMark": 1,
				"CurrentMark": 0
			},
			{
				"Name": "2",
				"Order": 2,
				"MaxMark": 1,
				"CurrentMark": 0
			},
			{
				"Name": "3.1",
				"Order": 3,
				"MaxMark": 1,
				"CurrentMark": 0
			}
		]
	}
}

@Injectable()
export class RsurProtocolsService {
	constructor(private http: HttpClient) { }

	getScan(fileId: number) {
		return Observable.of(protocolScanModel);
	}

	getParticipTest(participCode: number) {
		if (participCode == 12345) {
			particip.ParticipTest.Questions.sort((first, second) => {
				if (first.Order < second.Order) {
					return -1;
				}
				else {
					return 1;
				}
			});

			return Observable.of(particip);

		}
		else
			return Observable.throw('im fake error message');
	}
}
