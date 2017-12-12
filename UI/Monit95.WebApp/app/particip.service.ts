﻿import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ParticipModel } from "./particip.model";

@Injectable()
export class ParticipService {
	private GET_ALL_PARTICIPS_URL: string = "/api/particips/GetAll?projectId=";
	private GET_PARTICIP_URL: string = "/api/particips/";
	private ADD_PARTICIP_URL: string = "/api/particips/post";
	private UPDATE_PARTICIP_URL: string = "/api/particips/";
	private DELETE_PARTICIP_URL: string = "/api/particips/";

	constructor(private http: Http) { }

	getAll(projectId: number) {
		return this.http.get(this.GET_ALL_PARTICIPS_URL + projectId.toString());
	}

	getParticip(participId: number) {
		return this.http.get(this.GET_PARTICIP_URL + participId.toString());
	}

	addParticip(particip: ParticipModel): Observable<number> {
		return this.http.post(this.ADD_PARTICIP_URL, particip).map((res: Response) => {
			return res.json() as number;
		});
	}

	updateParticip(particip: ParticipModel): Observable<any> {
		return this.http.put(this.UPDATE_PARTICIP_URL + particip.Id.toString(), particip);
	}

	deleteParticip(participId: number): Observable<any> {
		return this.http.delete(this.DELETE_PARTICIP_URL + participId.toString());
	}
}