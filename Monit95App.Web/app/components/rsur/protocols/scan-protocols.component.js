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
var ScanProtocolsComponent = (function () {
    function ScanProtocolsComponent() {
        this.scans = [];
        this.scansInfo = [];
        this.displayedColumns = ['id', 'sourceName', 'size'];
        this.dataSource = new material_1.MatTableDataSource();
    }
    ScanProtocolsComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    };
    ScanProtocolsComponent.prototype.addPhoto = function (event) {
        var files = event.target.files;
        if (this.validateSelectedPhotos(files)) {
            for (var i = 0; i < files.length; i++) {
                var scanInfo = {
                    id: this.scans.length + 1,
                    sourceName: files[i].name,
                    size: files[i].size
                };
                this.scansInfo.push(scanInfo);
                this.scans.push(files[i]);
            }
            this.dataSource = new material_1.MatTableDataSource(this.scansInfo);
        }
        event.target.value = '';
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
    return ScanProtocolsComponent;
}());
ScanProtocolsComponent = __decorate([
    core_1.Component({
        selector: 'scan-protocols-component',
        templateUrl: "./app/components/rsur/protocols/scan-protocols.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/protocols/scan-protocols.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [])
], ScanProtocolsComponent);
exports.ScanProtocolsComponent = ScanProtocolsComponent;
//# sourceMappingURL=scan-protocols.component.js.map