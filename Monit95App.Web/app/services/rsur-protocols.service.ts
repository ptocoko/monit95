
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

const protocolScanModel = {
	Url: '/Images/rsur-scans/2090/1000/1.jpg',
	StillHasScans: false
};

@Injectable()
export class RsurProtocolsService {
	constructor(private http: HttpClient) { }

	getScan() {
		return Observable.of(protocolScanModel);
	}
}
