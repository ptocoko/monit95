import { Component, OnInit } from '@angular/core';
import { RsurRatingService } from '../../../services/rsur-rating.service';

@Component({
	selector: 'ratings',
    templateUrl: './ratings.component.html',
})
export class RatingsComponent implements OnInit {
    ratings: RatingItem[];        
	isLoading: boolean = true;
    selectedSubject: string = 'Русский язык';    

    constructor(private readonly rsurRatingService: RsurRatingService) {

    }

	ngOnInit() {		
        this.rsurRatingService.getRatings().subscribe(response => {
            //console.log(response);
            this.ratings = response;                       
	        this.isLoading = false;
	    });
	}	
}

export interface RatingItem {
    Place: number;
    SchoolName: string;
    PercentPassFirstTest: number;
    PercentPassSecondTest: number;
    SubjectName: string;
}
