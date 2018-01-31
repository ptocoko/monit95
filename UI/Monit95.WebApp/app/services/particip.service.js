"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var dataSourceMapperFunc = function (particip) {
    switch (particip.DataSource) {
        case 'school':
            particip.DataSource = 'Школа';
            break;
        default:
            break;
    }
    return particip;
};
var ParticipService = /** @class */ (function () {
    function ParticipService(http) {
        this.http = http;
        this.endpoint = "/api/ITakeEGE/participants/";
    }
    ParticipService.prototype.getAll = function (projectId) {
        return this.http.get(this.endpoint).map(function (particips) {
            particips.forEach(dataSourceMapperFunc);
            return particips;
        });
        //return Observable.of(mockParticipsList);
    };
    ParticipService.prototype.getParticip = function (participId) {
        return this.http.get(this.endpoint + participId).map(dataSourceMapperFunc);
        //return Observable.of(mockParticipsList.find(f => f.Id === participId));
    };
    ParticipService.prototype.postParticip = function (particip) {
        return this.http.post(this.endpoint, particip, { responseType: 'text' });
        //mockParticipsList.push(particip);
        //return Observable.of('hehe');
    };
    ParticipService.prototype.putParticip = function (particip, participId) {
        return this.http.put(this.endpoint + participId, particip, { responseType: 'text' });
    };
    ParticipService.prototype.deleteParticip = function (participId) {
        return this.http.delete(this.endpoint + participId, { responseType: 'text' });
        //const participIndex = mockParticipsList.indexOf(mockParticipsList.find(f => f.DocumNumber === documNumber));
        //mockParticipsList.splice(participIndex, 1);
        //return Observable.of('hah');
    };
    ParticipService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipService);
    return ParticipService;
}());
exports.ParticipService = ParticipService;
var mockParticipsList = [
    {
        Id: 1,
        Surname: 'Test1',
        Name: 'Test2',
        SecondName: 'Test3',
        DocumNumber: 12345,
        DataSource: 'РЦОИ'
    },
    {
        Id: 2,
        Surname: 'Test1',
        Name: 'Test2',
        SecondName: 'Test3',
        DocumNumber: 65432,
        DataSource: 'Школа',
    },
    {
        Id: 3,
        Surname: 'длиннаяфамилия',
        Name: 'heheheheh',
        SecondName: 'оченьдлинноеотчество',
        DocumNumber: 98745,
        DataSource: 'Школа'
    }
];
//# sourceMappingURL=particip.service.js.map