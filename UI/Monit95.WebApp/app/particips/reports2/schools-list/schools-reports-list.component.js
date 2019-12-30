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
import { Reports2Service } from '../../../services/iTakeEge/reports2/reports2.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    SchoolsReportsListComponent = __decorate([
        Component({
            templateUrl: './schools-reports-list.component.html',
            styleUrls: ['./schools-reports-list.component.css']
        }),
        __metadata("design:paramtypes", [Reports2Service, ActivatedRoute, Router])
    ], SchoolsReportsListComponent);
    return SchoolsReportsListComponent;
}());
export { SchoolsReportsListComponent };
//# sourceMappingURL=schools-reports-list.component.js.map