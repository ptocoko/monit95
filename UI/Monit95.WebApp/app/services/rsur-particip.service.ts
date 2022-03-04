import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { RsurParticipModel } from '../models/rsur-particip.model';
import { RsurParticipPostModel } from '../models/rsur/particip-post.model';

@Injectable()
export class RsurParticipService {    
    private ROUTE_PREFIX = 'api/rsurParticips'; 

    constructor(private readonly http: HttpClient) { }       

    createParticip(obj: RsurParticipPostModel): Observable<any> {
        return this.http.post(this.ROUTE_PREFIX, obj);
    }

	getAll() {
        return this.http.get<RsurParticipModel[]>(this.ROUTE_PREFIX);
    }

    update(code: number, particip: RsurParticipModel) {
		return this.http.put(`${this.ROUTE_PREFIX}/${code}`, particip, { responseType: 'text' });
    }

    delete(code: number) {
		return this.http.delete(`${this.ROUTE_PREFIX}/${code}`, { responseType: 'text' });
	}

	search(options: SearchOptions) {
		return this.http.get<SearchParticips>(`${this.ROUTE_PREFIX}/search`, { params: <any>options });
	}

    //downloadFile(data: HttpResponse) {
    //    const blob = new Blob([data]);
    //    const url = window.URL.createObjectURL(blob);
    //    window.open(url);
    //}		
}

export interface SearchParticips {
	TotalItems: number;
	Items: RsurParticipModel[];
}

export interface SearchOptions {
	AreaCode?: number;
	SchoolId?: string;
	ActualCodes?: number[];
	Search?: string;
	PageSize?: number;
	Page?: number;
}