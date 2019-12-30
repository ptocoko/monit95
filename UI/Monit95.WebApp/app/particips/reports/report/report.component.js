var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../../../services/iTakeEge/reports/reports.service';
var ReportComponent = /** @class */ (function () {
    function ReportComponent(reportService, router) {
        this.reportService = reportService;
        this.router = router;
    }
    ReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var participTestId = params['participTestId'];
            _this.reportService.getExtendReport(participTestId).subscribe(function (res) {
                _this.reportData = res;
            });
        });
    };
    ReportComponent.prototype.getGradeColor = function (grade100) {
        if (grade100 < 34) {
            return 'low-grade';
        }
        else if (grade100 > 33 && grade100 < 67) {
            return 'medium-grade';
        }
        else {
            return 'high-grade';
        }
    };
    ReportComponent = __decorate([
        Component({
            templateUrl: './report.component.html',
            styleUrls: ['./report.component.css']
        }),
        __metadata("design:paramtypes", [ReportsService,
            ActivatedRoute])
    ], ReportComponent);
    return ReportComponent;
}());
export { ReportComponent };
//# sourceMappingURL=report.component.js.map