﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ParticipModel } from '../../models/one-two-three/particip.model';

const endpoint = 'api/onetwothree/particips';

@Injectable()
export class ParticipService {

	constructor(private httpClient: HttpClient) { }

	getAll(): Observable<ParticipModel[]> {
		return this.httpClient.get<ParticipModel[]>(endpoint);
	}

	get(participId: number): Observable<ParticipModel> {
		return this.httpClient.get<ParticipModel>(`${endpoint}/${participId}`);
	}
}