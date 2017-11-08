import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SchoolFileService {
    private ROUTE_PREFIX = 'api/schoolFiles'; 

	constructor(private readonly http: HttpClient) {
	    
	}

    getFiles() {
        return this.http.get(`${this.ROUTE_PREFIX}`);		
    } 
}