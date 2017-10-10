"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
require("rxjs/add/operator/map");
var Person_1 = require("../../shared/Person");
var Marks = (function () {
    function Marks() {
    }
    return Marks;
}());
exports.Marks = Marks;
var ParticipWithMarks = (function (_super) {
    __extends(ParticipWithMarks, _super);
    function ParticipWithMarks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ParticipWithMarks;
}(Person_1.Person));
exports.ParticipWithMarks = ParticipWithMarks;
var MarksService = (function () {
    function MarksService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/marks';
    }
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
    MarksService.prototype.getMarksByRsurParticipTestId = function (participTestId) {
        return this.http.get('api/rsurMarks/' + participTestId);
    };
    MarksService.prototype.getRsurMarksByRsurTestId = function (rsurTestId) {
        return this.http.get('api/rsurMarks/GetByTestId/' + rsurTestId);
    };
    MarksService.prototype.addRsurMarks = function (marks) {
        return this.http.post('api/rsurMarks/Post', marks);
    };
    MarksService.prototype.updateRsurMarks = function (marks) {
        return this.http.put('api/rsurMarks/' + marks.participTestId, marks);
    };
    MarksService.prototype.getValueOfFilling = function (rsurTestId) {
        return this.http.get('api/rsurMarks/GetValueOfFilling?rsurTestId=' + rsurTestId);
    };
    return MarksService;
}());
MarksService = __decorate([
    core_1.Component({
        providers: [http_1.Http]
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MarksService);
exports.MarksService = MarksService;
//# sourceMappingURL=marks.service.js.map