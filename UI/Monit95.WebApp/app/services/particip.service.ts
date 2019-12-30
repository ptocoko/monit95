
import {map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable ,  of } from "rxjs";
import { ParticipModel } from "../models/particip.model";
import { HttpParams } from '@angular/common/http/src/params';

const dataSourceMapperFunc = (particip: ParticipModel) => {
	switch (particip.DataSource) {
		case 'school':
			particip.DataSource = 'Школа';
			break;
		default:
			break;
	}
	return particip;
}

@Injectable()
export class ParticipService {
	private endpoint: string = "/api/ITakeEGE/participants/";
	private ogeEndpoint = '/api/oge/participants';

	constructor(private http: HttpClient) { }

	getAll(): Observable<ParticipModel[]> {
		return this.http.get<ParticipModel[]>(this.endpoint).pipe(map(particips => {
			// превращаем 'school' в 'Школа'
			particips.forEach(dataSourceMapperFunc);
			return particips;
		}));
	}

	getAllOge(): Observable<ParticipModel[]> {
		return this.http.get<ParticipModel[]>(this.ogeEndpoint).pipe(map(particips => {
			// превращаем 'school' в 'Школа'
			particips.forEach(dataSourceMapperFunc);
			return particips;
		}));
	}

	getByProjectId(projectId: number) {
		return this.http.get<ParticipModel[]>(`${this.endpoint}/${projectId}`).pipe(map(particips => {
			// превращаем 'school' в 'Школа'
			particips.forEach(dataSourceMapperFunc);
			return particips;
		}));
	}

	getParticip(participId: number): Observable<ParticipModel> {
		return this.http.get<ParticipModel>(this.endpoint + participId).pipe(map(dataSourceMapperFunc));
	}

	postParticip(particip: ParticipModel, projectId: number) {
		return this.http.post(this.endpoint, particip, { responseType: 'text', params: { 'projectId': projectId.toString() } });
	}
	

	putParticip(particip: ParticipModel, participId: number) {
		return this.http.put(this.endpoint + participId, particip, { responseType: 'text' });
	}

	deleteParticip(participId: number) {
		return this.http.delete(this.endpoint + participId, { responseType: 'text' });
	}
}