import { Injectable, Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { RsurParticip } from '../rsurparticip';
import { ResultsModel, ResultDetailsModel } from '../results/results.model';
import { ParticipModel } from "../../particip.model";
import { Person } from "../../shared/Person";

export class Marks {
    participTestId: number;
    marks: string;
}

export class ParticipWithMarks extends Person {
	public ParticipTestId: number;
	public ClassName: string;
	public Marks: string;
}

@Component({
    providers: [Http]
})

@Injectable()
export class MarksService {    
    ROUTE_PREFIX = "api/marks";

    constructor(private http: Http) {

    }    

    addMarks(marks: Marks)
    {
        return this.http.post(this.ROUTE_PREFIX, marks);
    }

	updateMarks(marks: Marks) {
		return this.http.put(this.ROUTE_PREFIX, marks);
	}

    getAll(projectTestId: number) {
        return this.http.get(`${this.ROUTE_PREFIX}/GetAll?projectTestId=${projectTestId}`);
	}

	getMarksByParticipTestId(participTestId: number) {
		return this.http.get(`${this.ROUTE_PREFIX}/GetByParticipTestId=${participTestId}`);
	}
}