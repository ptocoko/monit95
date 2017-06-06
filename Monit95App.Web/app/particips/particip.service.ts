import { Injectable, Component }                                           from '@angular/core';
import { Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable }                                                      from 'rxjs/Observable';
import { ParticipModel }                                                   from './particip.model';

@Component({
    providers: [Http]
})

@Injectable()
export class ParticipService {
    public headers: Headers;
    constructor(private _http: Http) { }

    public _getByAreaCodeUrl: string = '/api/ProjectParticip/GetByUserName?userName=';

    getByAreaCode(userName: string, isAreaRole: boolean): Observable<ParticipModel[]> {
        
        var getByAreaCodeUrl = this._getByAreaCodeUrl + userName + "&isAreaRole=" + isAreaRole;
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
							particip.Birthday != null ? new Date(particip.Birthday) : null,
							particip.ClassNumbers
                        ));
                }
                //console.log(particips);
                return particips;
            });        
	}

	updateParticip(particip: ParticipModel): Observable<any> {
		return this._http.put('/api/ProjectParticip/UpdateParticip', particip);
	}
}