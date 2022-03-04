import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AreaModel } from '../models/area.model';

@Injectable()
export class AreaService {
	constructor(private http: HttpClient) { }

	getAll() {
		return this.http.get<AreaModel[]>('api/areas');
	}
}