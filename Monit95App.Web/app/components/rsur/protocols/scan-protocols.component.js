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
var material_1 = require("@angular/material");
var rsur_protocols_service_1 = require("../../../services/rsur-protocols.service");
var ScanProtocolsComponent = (function () {
    function ScanProtocolsComponent(rsurProtocolsService) {
        this.rsurProtocolsService = rsurProtocolsService;
        //scans: File[] = [];
        this.scans = [];
        this.displayedColumns = ['id', 'sourceName', 'size', 'uploadProgress'];
        this.dataSource = new material_1.MatTableDataSource();
    }
    ScanProtocolsComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    };
    ScanProtocolsComponent.prototype.addPhoto = function (event) {
        var files = event.target.files;
        if (this.validateSelectedPhotos(files)) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var scan = {
                    id: this.scans.length + 1,
                    sourceName: file.name,
                    size: file.size,
                    uploadProgress: 0,
                    fileContent: file,
                    status: ScanStatus.isUploading
                };
                this.scans.push(scan);
                this.uploadScan(scan);
            }
            this.dataSource = new material_1.MatTableDataSource(this.scans);
        }
        event.target.value = '';
    };
    ScanProtocolsComponent.prototype.uploadScan = function (scan) {
        scan.status = ScanStatus.isUploading;
        this.rsurProtocolsService.postScan(scan.fileContent).subscribe(function (progress) { return scan.uploadProgress = progress; }, function (error) { return scan.status = ScanStatus.isFailed; }, function () { return scan.status = ScanStatus.isComplete; });
    };
    ScanProtocolsComponent.prototype.reuploadScan = function (scan) {
        this.uploadScan(scan);
    };
    ScanProtocolsComponent.prototype.validateSelectedPhotos = function (files) {
        for (var i = 0; i < files.length; i++) {
            if (files[i].size / 1024 / 1024 > 15) {
                alert('Размер файла ' + files[i].name + ' превышает максимально разрешенный. \nМаксимально разрешенный размер файла — 10 МБ');
                return false;
            }
            if (['png', 'jpg', 'jpeg'].indexOf(files[i].name.split('.').pop().toLowerCase()) === -1) {
                alert('Файл ' + files[i].name + ' имеет неразрешенный формат.\nРазрешены следующие форматы файлов: .png, .jpg, .jpeg');
                return false;
            }
        }
        return true;
    };
    ScanProtocolsComponent.prototype.scanIsFailed = function (status) {
        return status === ScanStatus.isFailed;
    };
    ScanProtocolsComponent.prototype.scanIsUploading = function (status) {
        return status === ScanStatus.isUploading;
    };
    ScanProtocolsComponent.prototype.scanIsComplete = function (status) {
        return status === ScanStatus.isComplete;
    };
    return ScanProtocolsComponent;
}());
ScanProtocolsComponent = __decorate([
    core_1.Component({
        selector: 'scan-protocols-component',
        templateUrl: "./app/components/rsur/protocols/scan-protocols.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/protocols/scan-protocols.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService])
], ScanProtocolsComponent);
exports.ScanProtocolsComponent = ScanProtocolsComponent;
var ScanStatus;
(function (ScanStatus) {
    ScanStatus[ScanStatus["isUploading"] = 0] = "isUploading";
    ScanStatus[ScanStatus["isFailed"] = 1] = "isFailed";
    ScanStatus[ScanStatus["isComplete"] = 2] = "isComplete";
})(ScanStatus || (ScanStatus = {}));
//# sourceMappingURL=scan-protocols.component.js.map