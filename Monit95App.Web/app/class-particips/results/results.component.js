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
var results_service_1 = require("../../shared/results.service");
var router_1 = require("@angular/router");
var jsPDF = require("jspdf");
var ClassParticipResult = (function () {
    function ClassParticipResult() {
    }
    return ClassParticipResult;
}());
exports.ClassParticipResult = ClassParticipResult;
var MAX_MARKS = [4, 1, 3, 1, 1];
var ClassParticipResultsComponent = (function () {
    function ClassParticipResultsComponent(resultService, route) {
        this.resultService = resultService;
        this.route = route;
        this.maxMarks = MAX_MARKS;
        this.testDate = new Date(2017, 8, 17);
    }
    ClassParticipResultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var participTestId = params['participTestId'];
            _this.resultService.getClassParticipResult(participTestId).subscribe(function (res) { return _this.particip = res; });
        });
    };
    ClassParticipResultsComponent.prototype.download = function () {
        var _this = this;
        var element = document.getElementById('classParticip-reportContainer');
        var doc = new jsPDF('p', 'pt', 'a4');
        doc.addHTML(element, 20, 20, { 'width': 770 }, function () {
            doc.save(_this.particip.Fio);
        });
    };
    return ClassParticipResultsComponent;
}());
ClassParticipResultsComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/class-particips/results/results.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/class-particips/results/results.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [results_service_1.ResultsService, router_1.ActivatedRoute])
], ClassParticipResultsComponent);
exports.ClassParticipResultsComponent = ClassParticipResultsComponent;
//# sourceMappingURL=results.component.js.map