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
var school_file_service_1 = require("../../services/school-file.service");
// material
var material_1 = require("@angular/material");
var SchoolFilesComponent = (function () {
    function SchoolFilesComponent(schoolFileService) {
        this.schoolFileService = schoolFileService;
        this.isLoading = true;
        this.displayedColumns = ['ProjectName', 'Name', 'Year'];
    }
    SchoolFilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.schoolFileService.getFiles().subscribe(function (response) {
            console.log(response);
            _this.files = response;
            _this.dataSource = new material_1.MatTableDataSource(_this.files);
            _this.isLoading = false;
        });
    };
    return SchoolFilesComponent;
}());
SchoolFilesComponent = __decorate([
    core_1.Component({
        selector: 'school-files',
        templateUrl: "./app/components/school-files/school-files.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/school-files/school-files.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [school_file_service_1.SchoolFileService])
], SchoolFilesComponent);
exports.SchoolFilesComponent = SchoolFilesComponent;
//# sourceMappingURL=school-files.component.js.map