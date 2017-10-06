﻿import { Injectable, Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    providers: [Http]
})

@Injectable()
export class RsurExamStatisticService {
    private ROUTE_PREFIX = 'api/RsurExamStatisticService';

    constructor(private readonly http: Http) { }

    createParticip(obj: any): Observable<Response> {
        return this.http.post(this.ROUTE_PREFIX + '/Post', obj);
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
            .map((res: Response) => {
                let resultsInJSON = res.json();

                let results: ResultsModel[] = [];
                let resultDetail: ResultDetailsModel[];

                for (let index1 in resultsInJSON) {
                    let resultDetailsInJSON = resultsInJSON[Number.parseInt(index1)];

                    resultDetail = [];
                    for (let index2 in resultDetailsInJSON) {
                        let detailInJSON = resultDetailsInJSON[Number.parseInt(index2)]
                        resultDetail.push(new ResultDetailsModel(detailInJSON.SubjectName, new Date(detailInJSON.TestDate), detailInJSON.Marks, detailInJSON.Grade5, detailInJSON.TestId, detailInJSON.ReportExisting))
                    }
                    results.push(new ResultsModel(resultDetail))
                }
                return results;
            })
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