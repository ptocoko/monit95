"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
var ParticipService = /** @class */ (function () {
    function ParticipService(http) {
        this.http = http;
        this.GET_ALL_PARTICIPS_URL = "/api/particips/GetAll?projectId=";
        this.GET_PROTOCOLS_URL = '/api/particips/protocols?projectId=';
        this.endpoint = "/api/particips/";
    }
    ParticipService.prototype.getAll = function (projectId) {
        //return this.http.get<ParticipModel[]>(this.GET_ALL_PARTICIPS_URL + projectId);
        return Observable_1.Observable.of(mockParticipsList);
    };
    ParticipService.prototype.getParticip = function (participId) {
        //return this.http.get<ParticipModel>(this.endpoint + participId);
        return Observable_1.Observable.of(mockParticipsList.find(function (f) { return f.Id === participId; }));
    };
    ParticipService.prototype.addParticip = function (particip) {
        //return this.http.post(this.endpoint, particip, { responseType: 'text' });
        mockParticipsList.push(particip);
        return Observable_1.Observable.of('hehe');
    };
    ParticipService.prototype.updateParticip = function (particip) {
        throw Error('this method not implemented');
    };
    ParticipService.prototype.deleteParticip = function (documNumber) {
        //return this.http.delete(this.endpoint + participId, { responseType: 'text' });
        var participIndex = mockParticipsList.indexOf(mockParticipsList.find(function (f) { return f.DocumNumber === documNumber; }));
        mockParticipsList.splice(participIndex, 1);
        return Observable_1.Observable.of('hah');
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
        ProjectId: 12,
        DocumNumber: 12345,
        SourceName: 'РЦОИ',
        ClassName: '1a',
        Birthday: '12.11.2009',
        SchoolId: '0005',
        SchoolName: 'президентская школа'
    },
    {
        Id: 2,
        Surname: 'Test1',
        Name: 'Test2',
        SecondName: 'Test3',
        ProjectId: 12,
        DocumNumber: 65432,
        SourceName: 'Школа',
        ClassName: '1a',
        Birthday: '12.11.2009',
        SchoolId: '0005',
        SchoolName: 'президентская школа'
    },
    {
        Id: 3,
        Surname: 'длиннаяфамилия',
        Name: 'heheheheh',
        SecondName: 'оченьдлинноеотчество',
        ProjectId: 12,
        DocumNumber: 98745,
        SourceName: 'Школа',
        ClassName: '1a',
        Birthday: '12.11.2009',
        SchoolId: '0005',
        SchoolName: 'президентская школа'
    }
];
//# sourceMappingURL=particip.service.js.map