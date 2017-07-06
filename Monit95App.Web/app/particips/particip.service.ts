import { Injectable, Component }                                           from '@angular/core';
import { Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable }                                                      from 'rxjs/Observable';
import { ParticipModel } from './particip.model';
import { ParticipEditModel } from '../particips/edit-particip/edit-particip.model';
import { ResultsModel, ResultDetailsModel } from './results/results.model';
import { UserModel } from '../user.model';

@Component({
    providers: [Http]
})

@Injectable()
export class ParticipService {
    public headers: Headers;
    constructor(private _http: Http) { }

    private _getByAreaCodeUrl: string = '/api/RsurParticip/GetByUserName?userName=';

    getByAreaCode(user: UserModel): Observable<ParticipModel[]> {
        
        var getByAreaCodeUrl = this._getByAreaCodeUrl + user.userName + "&isAreaRole=" + user.isAreaRole;
        return this._http.get(getByAreaCodeUrl)
            .map((resp: Response) => {                
                let participList = resp.json();
                let particips: ParticipModel[] = [];
                for (let index in participList) {
                    let particip = participList[index];
                    particips.push(
                        new ParticipModel (
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
                        ));
                }
                //console.log(particips);
                return particips;
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
}