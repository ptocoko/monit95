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
                console.log(resp.json());
                let participList = resp.json().data;
                let particips: ParticipModel[] = [];
                for (let index in participList) {
                    console.log(participList[index]);
                    let particip = participList[index];
                    particips.push({ Surname: particip.Surname, Name: particip.Name });
                }
                return particips;
            });        
    }    
}