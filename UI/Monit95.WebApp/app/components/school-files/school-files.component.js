var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, } from '@angular/core';
import { SchoolFileService } from '../../services/school-file.service';
// material
import { MatTableDataSource } from '@angular/material';
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
            _this.dataSource = new MatTableDataSource(_this.files);
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
    SchoolFilesComponent = __decorate([
        Component({
            selector: 'school-files',
            templateUrl: './school-files.component.html',
            styleUrls: ['./school-files.component.css']
        }),
        __metadata("design:paramtypes", [SchoolFileService])
    ], SchoolFilesComponent);
    return SchoolFilesComponent;
}());
export { SchoolFilesComponent };
//# sourceMappingURL=school-files.component.js.map