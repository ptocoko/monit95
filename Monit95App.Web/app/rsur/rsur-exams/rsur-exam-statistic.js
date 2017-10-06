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
var http_1 = require("@angular/http");
var RsurExamStatisticService = (function () {
    function RsurExamStatisticService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/RsurExamStatisticService';
    }
    RsurExamStatisticService.prototype.createParticip = function (obj) {
        return this.http.post(this.ROUTE_PREFIX + '/Post', obj);
    };
    RsurExamStatisticService.prototype.getAll = function () {
        return this.http.get(this.ROUTE_PREFIX);
    };
    RsurExamStatisticService.prototype.update = function (code, particip) {
        return this.http.put(this.ROUTE_PREFIX + "/" + particip.Code, particip);
    };
    RsurExamStatisticService.prototype.delete = function (code) {
        return this.http.delete(this.ROUTE_PREFIX + "/" + code);
    };
    RsurExamStatisticService.prototype.downloadFile = function (data) {
        var blob = new Blob([data]);
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    };
    //update(particip: RsurParticipModel) {
    //}    
    //getParticip(participCode: string): Observable<ParticipModel> {
    //    return this.http.get('api/rsurParticips/' + participCode)
    //        .map((resp: Response) => {
    //            let participResp = resp.json();
    //            return this.getParticipModel(participResp);
    //        });
    //}
    RsurExamStatisticService.prototype.getParticipResults = function (participCode) {
        return this.http.get("/api/rsurParticips/GetParticipResults?participCode=" + participCode)
            .map(function (res) {
            var resultsInJSON = res.json();
            var results = [];
            var resultDetail;
            for (var index1 in resultsInJSON) {
                var resultDetailsInJSON = resultsInJSON[Number.parseInt(index1)];
                resultDetail = [];
                for (var index2 in resultDetailsInJSON) {
                    var detailInJSON = resultDetailsInJSON[Number.parseInt(index2)];
                    resultDetail.push(new ResultDetailsModel(detailInJSON.SubjectName, new Date(detailInJSON.TestDate), detailInJSON.Marks, detailInJSON.Grade5, detailInJSON.TestId, detailInJSON.ReportExisting));
                }
                results.push(new ResultsModel(resultDetail));
            }
            return results;
        });
    };
    return RsurExamStatisticService;
}());
RsurExamStatisticService = __decorate([
    core_1.Component({
        providers: [http_1.Http]
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RsurExamStatisticService);
exports.RsurExamStatisticService = RsurExamStatisticService;
//# sourceMappingURL=rsur-exam-statistic.js.map