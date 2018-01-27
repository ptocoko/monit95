import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ParticipModel } from "../models/particip.model";
import { ParticipWithMarks } from "../rsur/rsur-test-protocol/marks.service";

@Injectable()
export class ParticipService {
	private GET_ALL_PARTICIPS_URL: string = "/api/particips/GetAll?projectId=";
	private GET_PROTOCOLS_URL = '/api/particips/protocols?projectId=';
	private endpoint: string = "/api/particips/";
	
	constructor(private http: HttpClient) { }

	getAll(projectId: number) {
		return this.http.get<ParticipModel[]>(this.GET_ALL_PARTICIPS_URL + projectId);
	}

	getParticip(participId: number) {
		return this.http.get<ParticipModel>(this.endpoint + participId);
	}

	addParticip(particip: ParticipModel) {
		return this.http.post(this.endpoint, particip, { responseType: 'text' });
	}

	updateParticip(particip: ParticipModel) {
		throw Error('this method not implemented');
	}

	deleteParticip(participId: number) {
		return this.http.delete(this.endpoint + participId, { responseType: 'text' });
	}
}