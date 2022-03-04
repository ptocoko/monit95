import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CardsService {
	private readonly endpoint = '/api/cards';

	constructor(private http: HttpClient) { }

	getForSchool(projectTestId: number) {
		return this.http.get(`${this.endpoint}/${projectTestId}`, { responseType: 'blob' });
	}
}