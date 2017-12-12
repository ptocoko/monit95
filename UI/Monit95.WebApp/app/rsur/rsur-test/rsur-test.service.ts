﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class RsurTestService {    
    private ROUTE_PREFIX = 'api/RsurTests'; 

    constructor(private readonly http: Http) {
        
	} 

	getProtocolStatus() {
		return this.http.get(`${this.ROUTE_PREFIX}/Statistics`);
	}

	getTestName(rsurTestId: number) {
		return this.http.get(`${this.ROUTE_PREFIX}/${rsurTestId}/Name`);
	}
}