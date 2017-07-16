import { Injectable, Component }                                           from '@angular/core';
import { Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable }                                                      from 'rxjs/Observable';
import { ParticipModel } from './particip.model';
import { ParticipEditModel } from '../particips/edit-particip/edit-particip.model';
import { ResultsModel, ResultDetailsModel } from './results/results.model';

@Component({
    providers: [Http]
})

@Injectable()
export class ParticipService {
    public headers: Headers;
    constructor(private _http: Http) { }    

    getXlsxParticipList()
    {
        this._http.get('account/getName').subscribe(response =>
        {
            return this._http.get('/api/files/rsurParticipLists/' + response);
        })
        
    }

    get(): Observable<ParticipModel[]> {                        
        return this._http.get("api/rsurParticips")
            .map((resp: Response) => {                
                let participList = resp.json();
                let particips: ParticipModel[] = [];
                for (let index in participList) {
                    let particip = participList[index];
                    particips.push(this.getParticipModel(particip));
                }
                return particips;
            });        
	}	

    getParticip(participCode: string): Observable<ParticipModel> {
        return this._http.get('api/rsurParticips/' + participCode)
            .map((resp: Response) => {
                let participResp = resp.json();
                return this.getParticipModel(participResp);
            });
    }

	updateParticip(particip: ParticipModel): Observable<any> {
		return this._http.put('/api/RsurParticip/PutParticip', particip);
	}

	getParticipResults(participCode: string): Observable<ResultsModel[]> {
		return this._http.get('/api/RsurParticip/GetParticipResults?participCode=' + participCode)
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
		return this._http.post('/api/RsurParticipEdit/Post', editParticip);
	}

	private getParticipModel(particip: any): ParticipModel {
		return new ParticipModel(
						particip.ParticipCode,
						particip.Surname,
						particip.Name,
						particip.SecondName,
						particip.SubjectName,
						particip.SchoolIdWithName,
						particip.CategName,
						particip.Birthday != null ? new Date(particip.Birthday) : null,
						particip.ClassNumbers,
						particip.HasRequestToEdit
					);
	}
}