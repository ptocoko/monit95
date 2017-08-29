import { Injectable, Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

export class Marks {
    participTestId: number;
    marks: string;
}

@Component({
    providers: [Http]
})

@Injectable()
export class RsurParticipService {    
    ROUTE_PREFIX = "api/marks";

    constructor(private http: Http) {

    }    

    addMarks(marks: Marks)
    {
        return this.http.post(this.ROUTE_PREFIX, marks);
    }

    getAll(projectTestId: number) {
        return this.http.get(`${this.ROUTE_PREFIX}/?projectTestId=${projectTestId}`);
    }

    update(marks: Marks)
    {

    }

    update(particip: RsurParticipModel) {
        return this.http.put(`${this.ROUTE_PREFIX}/${particip.participCode}`, particip);
    }    

    //getParticip(participCode: string): Observable<ParticipModel> {
    //    return this.http.get('api/rsurParticips/' + participCode)
    //        .map((resp: Response) => {
    //            let participResp = resp.json();
    //            return this.getParticipModel(participResp);
    //        });
    //}

	

	getParticipResults(participCode: string): Observable<ResultsModel[]> {
		return this.http.get('/api/rsurParticips/GetParticipResults?participCode=' + participCode)
			.map((res: Response) =>
			{
				let resultsInJSON = res.json();

				let results: ResultsModel[] = [];
				let resultDetail: ResultDetailsModel[];

				for (let index1 in resultsInJSON)
				{
					let resultDetailsInJSON = resultsInJSON[Number.parseInt(index1)];

					resultDetail = [];
					for (let index2 in resultDetailsInJSON)
					{
						let detailInJSON = resultDetailsInJSON[Number.parseInt(index2)]
						resultDetail.push(new ResultDetailsModel(detailInJSON.SubjectName, new Date(detailInJSON.TestDate), detailInJSON.Marks, detailInJSON.Grade5, detailInJSON.TestId, detailInJSON.ReportExisting))
					}
					results.push(new ResultsModel(resultDetail))
				}
				return results;
			})
	}

	postRequestToEdit(editParticip: ParticipEditModel): Observable<any> {
		return this.http.post('/api/RsurParticipEdit/Post', editParticip);
	}

	//private getParticipModel(particip: any): ParticipModel {
	//	return new ParticipModel(
	//					particip.ParticipCode,
	//					particip.Surname,
	//					particip.Name,
	//					particip.SecondName,
	//					particip.SubjectName,
	//					particip.SchoolIdWithName,
	//					particip.CategName,
	//					particip.Birthday != null ? new Date(particip.Birthday) : null,
	//					particip.ClassNumbers,
	//					particip.HasRequestToEdit
	//				);
	//}
}