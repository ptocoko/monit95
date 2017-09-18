import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

const SCHOOL_COLLECTOR_API: string = '/api/collectors'

export class SchoolCollector {
	constructor(public CollectorId: number, public IsFinished: boolean) { }
}

@Injectable()
export class SchoolCollectorService {
	constructor(public http: Http) { }

	getSchoolCollectorState(collectorId: number): Observable<boolean> {
		return this.http.get(SCHOOL_COLLECTOR_API + `/${collectorId}`).map((response: Response) => {
			return response.json().IsFinished as boolean;
		});
	}

	isFinished(collectorId: number, isFinished: boolean) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.put(SCHOOL_COLLECTOR_API + `/${collectorId}`, { 'IsFinished': isFinished }, options);
	}
}