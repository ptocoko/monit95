"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
var http_1 = require("@angular/http");
require("rxjs/Rx");
var results_model_1 = require("./results/results.model");
var ParticipService = (function () {
    //headers: Headers;
    function ParticipService(http) {
        this.http = http;
    }
    ParticipService.prototype.downloadFile = function (data) {
        var blob = new Blob([data]);
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    };
    ParticipService.prototype.getAll = function () {
        return this.http.get("api/rsurParticips");
    };
    //   get(): Observable<ParticipModel[]> {                        
    //       return this.http.get("api/rsurParticips")
    //           .map((resp: Response) => {                
    //               const participList = resp.json();
    //               const particips: ParticipModel[] = [];
    //               for (let index in participList) {
    //                   let particip = participList[index];
    //                   particips.push(this.getParticipModel(particip));
    //               }
    //               return particips;
    //           });        
    //}	
    //getParticip(participCode: string): Observable<ParticipModel> {
    //    return this.http.get('api/rsurParticips/' + participCode)
    //        .map((resp: Response) => {
    //            let participResp = resp.json();
    //            return this.getParticipModel(participResp);
    //        });
    //}
    ParticipService.prototype.updateParticip = function (particip) {
        return this.http.put('/api/RsurParticip/PutParticip', particip);
    };
    ParticipService.prototype.getParticipResults = function (participCode) {
        return this.http.get('/api/rsurParticips/GetParticipResults?participCode=' + participCode)
            .map(function (res) {
            var resultsInJSON = res.json();
            var results = [];
            var resultDetail;
            for (var index1 in resultsInJSON) {
                var resultDetailsInJSON = resultsInJSON[Number.parseInt(index1)];
                resultDetail = [];
                for (var index2 in resultDetailsInJSON) {
                    var detailInJSON = resultDetailsInJSON[Number.parseInt(index2)];
                    resultDetail.push(new results_model_1.ResultDetailsModel(detailInJSON.SubjectName, new Date(detailInJSON.TestDate), detailInJSON.Marks, detailInJSON.Grade5, detailInJSON.TestId, detailInJSON.ReportExisting));
                }
                results.push(new results_model_1.ResultsModel(resultDetail));
            }
            return results;
        });
    };
    ParticipService.prototype.postRequestToEdit = function (editParticip) {
        return this.http.post('/api/RsurParticipEdit/Post', editParticip);
    };
    return ParticipService;
}());
ParticipService = __decorate([
    core_1.Component({
        providers: [http_1.Http]
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ParticipService);
exports.ParticipService = ParticipService;
//# sourceMappingURL=particip.service.js.map