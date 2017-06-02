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
var ParticipService = (function () {
    function ParticipService(_http) {
        this._http = _http;
        this._getByAreaCodeUrl = '/api/ProjectParticip/GetByUserName?userName=';
    }
    ParticipService.prototype.getByAreaCode = function (userName, isAreaRole) {
        var getByAreaCodeUrl = this._getByAreaCodeUrl + userName + "&isAreaRole=" + isAreaRole;
        return this._http.get(getByAreaCodeUrl)
            .map(function (resp) {
            var participList = resp.json();
            var particips = [];
            for (var index in participList) {
                var particip = participList[index];
                particips.push({
                    participCode: particip.ParticipCode,
                    surname: particip.Surname,
                    name: particip.Name,
                    secondName: particip.SecondName,
                    subjectName: particip.SubjectName,
                    birthday: particip.Birthday,
                    classes: particip.ClassNames
                });
            }
            //console.log(particips);
            return particips;
        });
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