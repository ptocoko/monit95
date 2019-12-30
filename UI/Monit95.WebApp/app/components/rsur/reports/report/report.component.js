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
import { RsurReportService } from '../../../../services/rsur-report.service';
var ReportComponent = /** @class */ (function () {
    function ReportComponent(reportService, router) {
        this.reportService = reportService;
        this.router = router;
        this.isWarnAboutGeoKimFail = false;
        this.isWarnAboutGeoKimFail_2 = false;
        this.isSocietyKimFail = false;
    }
    ReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var code = params['id'];
            _this.reportService.getReport(code).subscribe(function (res) {
                _this.reportData = res;
                _this.needToWarn();
            });
        });
    };
    ReportComponent.prototype.getGradeColor = function (grade100, rsurQuestionsCount) {
        //if (["0104", "0801"].indexOf(this.reportData.TestNumberCode) > -1 && this.reportData.RsurTestId > 2141 && this.reportData.RsurTestId < 3180) {
        //	return grade100 < 50 ? 'low-grade' : grade100 < 80 ? 'medium-grade' : 'high-grade';
        //} else if (this.reportData.RsurTestId === 2152 || this.reportData.RsurTestId === 2155) {
        //	return grade100 > 70 ? 'high-grade' : 'low-grade';
        //} else {
        //	if (grade100 < 60) {
        //		return 'low-grade';
        //	} else if (grade100 > 59 && grade100 < 81) {
        //		return 'medium-grade';
        //	} else {
        //		return 'high-grade';
        //	}
        //}
        if (this.reportData.TestNumberCode.substr(0, 2) === "03") {
            if (grade100 > 79) {
                return 'high-grade';
            }
            if (this.reportData.Grade5 === 5) {
                return 'medium-grade';
            }
            else {
                return 'low-grade';
            }
        }
        var midPercent = rsurQuestionsCount <= 2 ? 50 : 60;
        var highPercent = this.reportData.RsurTestId === 3185 ? 80 : 81;
        if (grade100 < midPercent) {
            return 'low-grade';
        }
        else if (grade100 >= midPercent && grade100 < highPercent) {
            return 'medium-grade';
        }
        else {
            return 'high-grade';
        }
    };
    ReportComponent.prototype.needToWarn = function () {
        if (this.reportData.RsurTestId === 2153 && this.reportData.EgeQuestionResults.filter(function (f) { return [26, 27].indexOf(f.EgeQuestionNumber) > -1 && f.Value < 100; }).length > 0) {
            this.isWarnAboutGeoKimFail = true;
        }
        if (this.reportData.RsurTestId === 3184 && this.reportData.EgeQuestionResults.filter(function (f) { return f.EgeQuestionNumber === 17 && f.Value < 100; }).length > 0) {
            this.isWarnAboutGeoKimFail_2 = true;
        }
    };
    ReportComponent = __decorate([
        Component({
            selector: 'report',
            templateUrl: './report.component.html',
            styleUrls: ['./report.component.css']
        }),
        __metadata("design:paramtypes", [RsurReportService,
            ActivatedRoute])
    ], ReportComponent);
    return ReportComponent;
}());
export { ReportComponent };
//# sourceMappingURL=report.component.js.map