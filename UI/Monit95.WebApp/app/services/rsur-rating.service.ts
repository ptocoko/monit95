import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RatingItem } from '../components/rsur/ratings/ratings.component';

@Injectable()
export class RsurRatingService {
    private ROUTE_PREFIX = 'api/rsur/ratings'; 

	constructor(private readonly http: HttpClient) {
	    
	}

    getRatings() {
		return this.http.get<RatingItem[]>(`${this.ROUTE_PREFIX}`);		
    }  

    getMockRatings() {
		return this.http.get<RatingItem[]>('/ratings.mock.json');
    }
}