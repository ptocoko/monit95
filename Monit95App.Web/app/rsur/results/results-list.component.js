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
var rsur_results_service_1 = require("./rsur-results.service");
var router_1 = require("@angular/router");
var TEST_DATE = '2017-10-11';
var RsurResultsListComponent = (function () {
    function RsurResultsListComponent(rsurResultsService, route) {
        this.rsurResultsService = rsurResultsService;
        this.route = route;
        this.searchTest = 'Все результаты';
    }
    RsurResultsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.rsurResultsService.getReports(TEST_DATE).subscribe(function (res) {
            _this.resultsList = res.json();
            _this.rsurTests =
                _this.resultsList.map(function (s) { return s.TestNameWithDate; }).filter(function (val, i, self) { return self.indexOf(val) === i; });
            _this.isLoading = false;
        });
    };
    RsurResultsListComponent.prototype.openReport = function (rsurParticipCode) {
        this.route.navigate(['/rsur/report', rsurParticipCode]);
    };
    return RsurResultsListComponent;
}());
RsurResultsListComponent = __decorate([
    core_1.Component({
        selector: 'results-list',
        templateUrl: "./app/rsur/results/results-list.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [rsur_results_service_1.RsurResultsService,
        router_1.Router])
], RsurResultsListComponent);
exports.RsurResultsListComponent = RsurResultsListComponent;
//# sourceMappingURL=results-list.component.js.map