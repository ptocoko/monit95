
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

const protocolScanModel = {
	FileId: 123,
	Url: '/Images/rsur-scans/2090/1000/1.jpg',
	FileName: 'IMG_0001_01.JPG',
	StillHasScans: false
};

@Injectable()
export class RsurProtocolsService {
	constructor(private http: HttpClient) { }

	getScan(fileId: number) {
		return Observable.of(protocolScanModel);
	}
}
