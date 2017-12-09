"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var person_model_1 = require("../../models/person.model");
var Marks = /** @class */ (function () {
    function Marks() {
    }
    return Marks;
}());
exports.Marks = Marks;
var ParticipWithMarks = /** @class */ (function (_super) {
    tslib_1.__extends(ParticipWithMarks, _super);
    function ParticipWithMarks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ParticipWithMarks;
}(person_model_1.PersonModel));
exports.ParticipWithMarks = ParticipWithMarks;
var MarksService = /** @class */ (function () {
    function MarksService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/rsurMarks';
    }
    MarksService.prototype.getMarksByRsurParticipTestId = function (rsurParticipTestId) {
        return this.http.get(this.ROUTE_PREFIX + "/" + rsurParticipTestId);
    };
    MarksService.prototype.addMarks = function (marks) {
        return this.http.post(this.ROUTE_PREFIX + '/Post', marks);
    };
    MarksService.prototype.updateMarks = function (marks) {
        return this.http.put(this.ROUTE_PREFIX + "/" + marks.participTestId, marks);
    };
    MarksService.prototype.getAll = function (projectTestId) {
        return this.http.get(this.ROUTE_PREFIX + "/GetAll?projectTestId=" + projectTestId);
    };
    MarksService.prototype.getMarksByParticipTestId = function (participTestId) {
        return this.http.get(this.ROUTE_PREFIX + "/GetByParticipTestId?participTestId=" + participTestId);
    };
    MarksService.prototype.getRsurProtocols = function (rsurTestId) {
        return this.http.get("api/rsurTests/" + rsurTestId + "/protocols");
    };
    MarksService.prototype.addRsurMarks = function (marks) {
        return this.http.post(this.ROUTE_PREFIX + "/Post", marks);
    };
    MarksService.prototype.updateRsurMarks = function (marks) {
        return this.http.put(this.ROUTE_PREFIX + "/" + marks.participTestId, marks);
    };
    MarksService = tslib_1.__decorate([
        core_1.Component({
            providers: [http_1.Http]
        }),
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.Http])
    ], MarksService);
    return MarksService;
}());
exports.MarksService = MarksService;
//# sourceMappingURL=marks.service.js.map