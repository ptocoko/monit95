import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { RsurParticipModel } from '../models/rsur-particip.model';

@Injectable()
export class RsurParticipService {    
    private ROUTE_PREFIX = 'api/rsurParticips'; 

    constructor(private readonly http: HttpClient) { }       

    createParticip(obj: any): Observable<any> {
        return this.http.post(this.ROUTE_PREFIX + '/Post', obj);
    }

    getAll() {
        return this.http.get<RsurParticipModel[]>(this.ROUTE_PREFIX);
    }

    update(code: number, particip: RsurParticipModel) {
		return this.http.put(`${this.ROUTE_PREFIX}/${particip.Code}`, particip, { responseType: 'text' });
    }

    delete(code: number) {
        return this.http.delete(`${this.ROUTE_PREFIX}/${code}`);
    }

    //downloadFile(data: HttpResponse) {
    //    const blob = new Blob([data]);
    //    const url = window.URL.createObjectURL(blob);
    //    window.open(url);
    //}		
}