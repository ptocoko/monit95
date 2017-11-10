import { Injectable, Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { RsurParticipModel } from '../models/rsur-particip.models';

@Component({
    providers: [Http]
})

@Injectable()
export class RsurParticipService {    
    private ROUTE_PREFIX = 'api/rsurParticips'; 

    constructor(private readonly http: Http) { }       

    createParticip(obj: any): Observable<Response> {
        return this.http.post(this.ROUTE_PREFIX + '/Post', obj);
    }

    getAll() {
        return this.http.get(this.ROUTE_PREFIX);
    }

    update(code: number, particip: RsurParticipModel) {
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
}