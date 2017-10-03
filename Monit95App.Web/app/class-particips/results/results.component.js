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
var http_1 = require("@angular/http");
var ClassParticipResult = (function () {
    function ClassParticipResult() {
    }
    return ClassParticipResult;
}());
exports.ClassParticipResult = ClassParticipResult;
var MAX_MARKS = [4, 1, 3, 1, 1];
var ClassParticipResultsComponent = (function () {
    function ClassParticipResultsComponent(resultService, route, http) {
        this.resultService = resultService;
        this.route = route;
        this.http = http;
        this.maxMarks = MAX_MARKS;
        this.testDate = "17 Сентября, 2017 г.";
    }
    ClassParticipResultsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.participTestId = params['participTestId'];
            _this.resultService.getClassParticipResult(_this.participTestId).subscribe(function (res) { return _this.particip = res; });
        });
    };
    ClassParticipResultsComponent.prototype.download = function () {
        //let element = document.getElementById('classParticip-reportContainer');
        //let doc = new jsPDF('p', 'pt', 'a4');
        //html2canvas($('.classParticip-reportContainer').get(0), {background: '#fff'}).then(canvas => {
        //	document.body.appendChild(canvas);
        //	doc.addHTML(canvas, () => {
        //		document.body.removeChild(canvas);
        //		doc.save(this.particip.Fio + '.pdf');
        //	});
        //});
        this.http.get('/api/ResultReport/Get?participTestId=' + this.participTestId, { responseType: http_1.ResponseContentType.Blob }).subscribe(function (data) {
            var a = document.createElement("a");
            a.href = URL.createObjectURL(data.blob());
            a.download = 'excel';
            a.click();
        });
    };
    return ClassParticipResultsComponent;
}());
ClassParticipResultsComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/class-particips/results/results.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/class-particips/results/results.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [results_service_1.ResultsService, router_1.ActivatedRoute, http_1.Http])
], ClassParticipResultsComponent);
exports.ClassParticipResultsComponent = ClassParticipResultsComponent;
//# sourceMappingURL=results.component.js.map