import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ParticipModel } from "../models/particip.model";
import { ParticipWithMarks } from "../rsur/rsur-test-protocol/marks.service";

@Injectable()
export class ParticipService<T> {
	private GET_ALL_PARTICIPS_URL: string = "/api/particips/GetAll?projectId=";
	private GET_PROTOCOLS_URL = '/api/particips/protocols?projectId=';
	private endpoint: string = "/api/particips/";
	
	constructor(private http: HttpClient) { }

	getAll(projectId: number) {
		return this.http.get<T[]>(this.GET_ALL_PARTICIPS_URL + projectId);
	}

	getParticip(participId: number) {
		return this.http.get<T>(this.endpoint + participId);
	}

	addParticip(particip: T|any) {
		return this.http.post(this.endpoint, particip, { responseType: 'text' });
	}

	updateParticip(particip: T|any) {
		return this.http.put(this.endpoint + particip.Id, particip, { responseType: 'text' });
	}

	deleteParticip(participId: number) {
		return this.http.delete(this.endpoint + participId, { responseType: 'text' });
	}
}