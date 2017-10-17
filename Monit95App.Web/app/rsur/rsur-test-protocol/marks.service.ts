import { Injectable, Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Person } from '../../shared/Person';

export class Marks {
    participTestId: number;
    marks: string;
}

export class ParticipWithMarks extends Person {
	ParticipTestId: number;
	ClassName: string;
	Marks: string;
}

@Component({
    providers: [Http]
})

@Injectable()
export class MarksService {    
    ROUTE_PREFIX = 'api/rsurMarks';

    constructor(private readonly http: Http) {

    }    

    addMarks(marks: Marks) {
        return this.http.post(this.ROUTE_PREFIX + '/Post', marks);
    }

	updateMarks(marks: Marks) {
		return this.http.put(`${this.ROUTE_PREFIX}/${marks.participTestId}`, marks);
	}

    getAll(projectTestId: number) {
        return this.http.get(`${this.ROUTE_PREFIX}/GetAll?projectTestId=${projectTestId}`);
	}

	getMarksByParticipTestId(participTestId: number) {
		return this.http.get(`${this.ROUTE_PREFIX}/GetByParticipTestId?participTestId=${participTestId}`);
	}

	getMarksByRsurParticipTestId(rsurParticipTestId: number) {
        return this.http.get(`${this.ROUTE_PREFIX}/${rsurParticipTestId}`);
	}

	getRsurMarksByRsurTestId(rsurTestId: number) {
		return this.http.get(`${this.ROUTE_PREFIX}/ByTestId/${rsurTestId}`);
	}

	addRsurMarks(marks: Marks) {
		return this.http.post(`${this.ROUTE_PREFIX}/Post`, marks);
	}

	updateRsurMarks(marks: Marks) {
		return this.http.put(`${this.ROUTE_PREFIX}/${marks.participTestId}`, marks);
	}
}