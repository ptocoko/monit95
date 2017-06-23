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
require("rxjs/Rx");
var particip_model_1 = require("./particip.model");
var results_model_1 = require("./results/results.model");
var ParticipService = (function () {
    function ParticipService(_http) {
        this._http = _http;
        this._getByAreaCodeUrl = '/api/ProjectParticip/GetByUserName?userName=';
    }
    ParticipService.prototype.getByAreaCode = function (user) {
        var getByAreaCodeUrl = this._getByAreaCodeUrl + user.userName + "&isAreaRole=" + user.isAreaRole;
        return this._http.get(getByAreaCodeUrl)
            .map(function (resp) {
            var participList = resp.json();
            var particips = [];
            for (var index in participList) {
                var particip = participList[index];
                particips.push(new particip_model_1.ParticipModel(particip.ParticipCode, particip.Surname, particip.Name, particip.SecondName, particip.SubjectName, particip.Birthday != null ? new Date(particip.Birthday) : null, particip.ClassNumbers, particip.HasRequestToEdit));
            }
            //console.log(particips);
            return particips;
        });
    };
    ParticipService.prototype.updateParticip = function (particip) {
        return this._http.put('/api/ProjectParticip/UpdateParticip', particip);
    };
    ParticipService.prototype.getParticipResults = function (participCode) {
        return this._http.get('/api/ProjectParticip/GetParticipResults?participCode=' + participCode)
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
        return this._http.post('/api/ParticipEdit/Post', editParticip);
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