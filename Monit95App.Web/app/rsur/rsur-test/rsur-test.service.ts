import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class RsurTestService {    
    private ROUTE_PREFIX = 'api/RsurTests'; 

    constructor(private readonly http: Http) {
        
    }       

    getProtocolStatus(rsurTestId: number) {
        return this.http.get(`${this.ROUTE_PREFIX}/${rsurTestId}/Statistics`);
    }  
}