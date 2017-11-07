import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RsurRatingService {
    private ROUTE_PREFIX = 'api/rsur/ratings'; 

	constructor(private readonly http: HttpClient) {
	    
	}

    getRatings() {
        return this.http.get(`${this.ROUTE_PREFIX}`);		
    }  

    getMockRatings() {
        return this.http.get('/ratings.mock.json');
    }
}