import { Injectable, Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { RsurParticip } from '../rsurparticip';
import { ResultsModel, ResultDetailsModel } from '../results/results.model';
import { ParticipModel } from "../../particip.model";

export class Marks {
    participTestId: number;
    marks: string;
}

export class ParticipWithMarks extends ParticipModel {
	public ParticipTestId: number;
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

    getAll(projectTestId: number) {
        return this.http.get(`${this.ROUTE_PREFIX}/GetAll?projectTestId=${projectTestId}`);
    }
}