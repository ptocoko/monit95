import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchoolModel } from './models/school.model';

@Injectable()
export class SchoolService {    
    private ROUTE_PREFIX = 'api/schools'; 

    constructor(private readonly http: HttpClient) { }       

    getAll() {
        return this.http.get(this.ROUTE_PREFIX);
	}    

	getByAreaCode(areaCode: number) {
		return this.http.get<SchoolModel[]>(`${this.ROUTE_PREFIX}/${areaCode}`);
	}
}