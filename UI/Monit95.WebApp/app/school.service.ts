import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchoolModel } from './models/school.model';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SchoolService {    
    private ROUTE_PREFIX = 'api/schools'; 
	private areaSchools: { [key:number]: SchoolModel[] };

    constructor(private readonly http: HttpClient) { }       

    getAll() {
        return this.http.get(this.ROUTE_PREFIX);
	}    

	getByAreaCode(areaCode: number): Observable<SchoolModel[]> {
		if (this.areaSchools[areaCode]) {
			return of(this.areaSchools[areaCode])
		};
		
		return this.http.get<SchoolModel[]>(`${this.ROUTE_PREFIX}/${areaCode}`).map(model => {
			this.areaSchools[areaCode] = model;
			return model;
		});
	}

	getInfo(id: string): Observable<SchoolModel> {
		return this.http.get<SchoolModel>('/api/schools/getInfo', { params: { id } });
	}
}

