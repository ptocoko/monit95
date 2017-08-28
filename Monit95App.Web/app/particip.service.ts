import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ParticipModel } from "./particip.model";

@Injectable()
export class ParticipService {
	private GET_ALL_PARTICIPS_URL: string = "/api/particips?projectCodeId=";
	private GET_PARTICIP_URL: string = "/api/particips/";
	private ADD_PARTICIP_URL: string = "/api/particips";
	private UPDATE_PARTICIP_URL: string = "/api/particips/";
	private DELETE_PARTICIP_URL: string = "/api/particips/";

	constructor(private http: Http) { }

	getAll(projectId: number): Observable<ParticipModel[]> {
		return this.http.get(this.GET_ALL_PARTICIPS_URL + projectId.toString()).map((res: Response) => {
			return res.json() as ParticipModel[]
		});
	}

	getParticip(participId: number): Observable<ParticipModel> {
		return this.http.get(this.GET_PARTICIP_URL + participId.toString()).map((res: Response) => {
			return res.json() as ParticipModel;
		});
	}

	addParticip(particip: ParticipModel): Observable<number> {
		return this.http.post(this.ADD_PARTICIP_URL, particip).map((res: Response) => {
			return res.json() as number;
		});
	}

	updateParticip(particip: ParticipModel): Observable<any> {
		return this.http.put(this.UPDATE_PARTICIP_URL + particip.id.toString(), particip);
	}

	deleteParticip(participId: number): Observable<any> {
		return this.http.delete(this.DELETE_PARTICIP_URL + participId.toString());
	}
}