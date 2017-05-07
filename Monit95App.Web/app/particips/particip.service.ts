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

    public _getByAreaCodeUrl: string = '/api/ProjectParticip/GetByAreaCode?areaCode=';

    getByAreaCode(areaCode: number): Observable<ParticipModel[]> {
        console.log('getByAreaCode(areaCode: number)')
        var getByAreaCodeUrl = this._getByAreaCodeUrl + areaCode;
        return this._http.get(getByAreaCodeUrl)
            .map((resp: Response) => {                
                let participList = resp.json();
                let particips: ParticipModel[] = [];
                for (let index in participList) {
                    let particip = participList[index];
                    particips.push(
                        {
                            participCode: particip.ParticipCode,
                            surname: particip.Surname,
                            name: particip.Name,
                            secondName: particip.SecondName,
                            subjectName: particip.SubjectName
                        });
                }
                console.log(particips);
                return particips;
            });        
    }    
}