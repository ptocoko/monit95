"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var school_file_service_1 = require("../../services/school-file.service");
// material
var material_1 = require("@angular/material");
var SchoolFilesComponent = /** @class */ (function () {
    function SchoolFilesComponent(schoolFileService) {
        this.schoolFileService = schoolFileService;
        this.isLoading = true;
        this.displayedColumns = ['ProjectName', 'Name', 'Year', 'Status'];
    }
    SchoolFilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.schoolFileService.getFiles().subscribe(function (response) {
            //console.log(response);
            _this.files = response;
            _this.dataSource = new material_1.MatTableDataSource(_this.files);
            _this.isLoading = false;
        });
    };
    SchoolFilesComponent.prototype.setReportIsGot = function (report, button) {
        button.disabled = true;
        this.schoolFileService.setReportIsGot(report.Id).subscribe(function (res) {
            report.IsGot = true;
        }, function (error) {
            button.disabled = false;
            throw error;
        });
    };
    SchoolFilesComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'school-files',
            templateUrl: "./app/components/school-files/school-files.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/school-files/school-files.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [school_file_service_1.SchoolFileService])
    ], SchoolFilesComponent);
    return SchoolFilesComponent;
}());
exports.SchoolFilesComponent = SchoolFilesComponent;
//# sourceMappingURL=school-files.component.js.map