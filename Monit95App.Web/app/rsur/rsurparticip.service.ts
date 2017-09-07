import { Injectable, Component } from '@angular/core';
//import { Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { RsurParticip } from './rsurparticip';
import { ParticipEditModel } from '../rsur/edit-particip/edit-particip.model';
import { ResultsModel, ResultDetailsModel } from './results/results.model';

@Component({
    providers: [Http]
})

@Injectable()
export class RsurParticipService {    
    private ROUTE_PREFIX = 'api/RsurParticips'; 

    constructor(private readonly http: Http) { }       

    createParticip(obj: RsurParticip): Observable<Response> {
        return this.http.post(this.ROUTE_PREFIX, obj);
    }

    getAll() {
        return this.http.get(this.ROUTE_PREFIX);
    }

    update(code: number, particip: RsurParticip) {
        return this.http.put(`${this.ROUTE_PREFIX}/${particip.Code}`, particip);
    }

    delete(code: number) {
        return this.http.delete(`${this.ROUTE_PREFIX}/${code}`);
    }

    downloadFile(data: Response) {
        const blob = new Blob([data]);
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }
    //update(particip: RsurParticipModel) {
    
    //}    

    //getParticip(participCode: string): Observable<ParticipModel> {
    //    return this.http.get('api/rsurParticips/' + participCode)
    //        .map((resp: Response) => {
    //            let participResp = resp.json();
    //            return this.getParticipModel(participResp);
    //        });
    //}

	

	getParticipResults(participCode: string): Observable<ResultsModel[]> {
		return this.http.get(`/api/rsurParticips/GetParticipResults?participCode=${participCode}`)
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