"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var reports2_service_1 = require("../../../services/iTakeEge/reports2/reports2.service");
var router_1 = require("@angular/router");
var SchoolsReportsListComponent = /** @class */ (function () {
    function SchoolsReportsListComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.isLoading = false;
        this.projectTestId = 0;
    }
    SchoolsReportsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var projectId = Number.parseInt(_this.route.snapshot.queryParamMap.get('projectId'), 10);
            var projectName = _this.route.snapshot.queryParamMap.get('projectName');
            if (projectId) {
                _this.projectId = projectId;
            }
            else {
                throw new Error('projectId not setted');
            }
            if (projectName) {
                _this.projectName = projectName;
            }
            else {
                throw new Error('projectName not setted');
            }
            _this.isLoading = true;
            _this.projectTestId = Number.parseInt(params.get('projectTestId'), 10);
            _this.service.getSchoolsReports(_this.projectTestId)
                .subscribe(function (rep) {
                _this.schoolReports = rep;
                _this.isLoading = false;
            });
        });
    };
    SchoolsReportsListComponent.prototype.onNavigate = function (schoolId) {
        console.log(schoolId);
        this.router.navigate(['/particips/reports/' + this.projectId], { queryParams: { schoolId: schoolId, testCode: this.projectTestId, projectName: this.projectName } });
    };
    SchoolsReportsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/reports2/schools-list/schools-reports-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/particips/reports2/schools-list/schools-reports-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [reports2_service_1.Reports2Service, router_1.ActivatedRoute, router_1.Router])
    ], SchoolsReportsListComponent);
    return SchoolsReportsListComponent;
}());
exports.SchoolsReportsListComponent = SchoolsReportsListComponent;
//# sourceMappingURL=schools-reports-list.component.js.map