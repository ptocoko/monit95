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
var rsur_results_service_1 = require("../results/rsur-results.service");
var router_1 = require("@angular/router");
var RsurReportComponent = (function () {
    function RsurReportComponent(rsurResultsService, router) {
        this.rsurResultsService = rsurResultsService;
        this.router = router;
    }
    RsurReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var code = params['id'];
            _this.rsurResultsService.getReport(code).subscribe(function (res) { return _this.reportData = res; });
        });
    };
    return RsurReportComponent;
}());
RsurReportComponent = __decorate([
    core_1.Component({
        selector: 'rsur-report',
        templateUrl: "./app/rsur/report/rsur-report.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/rsur/report/rsur-report.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [rsur_results_service_1.RsurResultsService,
        router_1.ActivatedRoute])
], RsurReportComponent);
exports.RsurReportComponent = RsurReportComponent;
//# sourceMappingURL=rsur-report.component.js.map