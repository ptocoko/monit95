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
var rsur_protocols_service_1 = require("../../../services/rsur-protocols.service");
var http_1 = require("@angular/common/http");
var ScanProtocolsComponent = (function () {
    function ScanProtocolsComponent(rsurProtocolsService, _iterableDiffers, differs) {
        this.rsurProtocolsService = rsurProtocolsService;
        this._iterableDiffers = _iterableDiffers;
        this.differs = differs;
        this.scans = [];
        this.notMatchedScansCount = 0;
        this.duplicatesCount = 0;
        this.failedScansCount = 0;
        this.isPageLoading = false;
        this.isScansUploading = false;
        this.iterableDiffer = _iterableDiffers.find([]).create(null);
    }
    ScanProtocolsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.objDiffer = {};
        this.isPageLoading = true;
        this.rsurProtocolsService.getNotMatchedScans().subscribe(function (res) {
            _this.scans = res;
            _this.isPageLoading = false;
            _this.scans.forEach(function (elt) {
                _this.objDiffer[elt] = _this.differs.find(elt).create();
            });
        });
    };
    ScanProtocolsComponent.prototype.ngDoCheck = function () {
        var _this = this;
        var isChanged = false;
        var changes = this.iterableDiffer.diff(this.scans);
        if (changes) {
            isChanged = true;
        }
        this.scans.forEach(function (elt) {
            var objDiffer = _this.objDiffer[elt];
            var objChanges = objDiffer.diff(elt);
            if (objChanges) {
                isChanged = true;
            }
        });
        if (isChanged) {
            this.isScansUploading = this.scans.filter(function (f) { return f.Status === 'isUploading'; }).length > 0;
            this.getStats();
        }
    };
    ScanProtocolsComponent.prototype.getStats = function () {
        this.notMatchedScansCount = this.scans.filter(function (s) { return s.FileId; }).length;
        this.failedScansCount = this.scans.filter(function (s) { return s.Status === 'isFailed'; }).length;
    };
    ScanProtocolsComponent.prototype.addPhoto = function (event) {
        var files = event.target.files;
        if (this.validateSelectedPhotos(files)) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var scan = {
                    SourceName: file.name,
                    UploadProgress: 0,
                    FileContent: file,
                    FileId: null,
                    Status: 'isUploading'
                };
                this.scans.push(scan);
                this.uploadScan(scan);
            }
        }
        event.target.value = '';
    };
    ScanProtocolsComponent.prototype.uploadScan = function (scan) {
        var _this = this;
        scan.Status = 'isUploading';
        this.isScansUploading = true;
        this.rsurProtocolsService.postScan(scan.FileContent).subscribe(function (response) { return _this.responseHandler(response, scan); }, function (error) { return _this.errorResponseHandler(error, scan); }, function () { return scan.Status = 'isComplete'; });
    };
    ScanProtocolsComponent.prototype.responseHandler = function (res, scan) {
        if (res instanceof http_1.HttpResponse) {
            scan.FileId = res.body; //этот кусок кода для того чтобы отличить FileId от процента загрузки файла
            scan.FileContent = null; //очищаем FileContent после отправки чтобы не забивать оперативную память
        }
        else {
            scan.UploadProgress = res;
        }
    };
    ScanProtocolsComponent.prototype.errorResponseHandler = function (error, scan) {
        if (error.status && error.status === 409) {
            var duplicatedScanIndex = this.scans.indexOf(scan);
            this.scans.splice(duplicatedScanIndex, 1);
            this.duplicatesCount += 1;
        }
        else {
            scan.Status = 'isFailed';
            this.failedScansCount += 1;
        }
    };
    ScanProtocolsComponent.prototype.deleteScan = function (scan) {
        var _this = this;
        var statusBeforeDeleting = scan.Status;
        scan.Status = 'isDeleting';
        if (statusBeforeDeleting !== 'isFailed') {
            this.rsurProtocolsService.deleteScan(scan.FileId).subscribe(function (res) { return _this.scans.splice(_this.scans.indexOf(scan), 1); }, function (error) {
                var message = error.message ? error.message : error;
                alert(message);
                console.error(error);
                scan.Status = statusBeforeDeleting;
            });
        }
        else {
            this.scans.splice(this.scans.indexOf(scan), 1);
        }
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
    return ScanProtocolsComponent;
}());
ScanProtocolsComponent = __decorate([
    core_1.Component({
        selector: 'scan-protocols-component',
        templateUrl: "./app/components/rsur/protocols/scan-protocols.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/protocols/scan-protocols.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService,
        core_1.IterableDiffers,
        core_1.KeyValueDiffers])
], ScanProtocolsComponent);
exports.ScanProtocolsComponent = ScanProtocolsComponent;
//попытка сделать один общий фильтр pipe
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (array, searchObj) {
        var _loop_1 = function (key) {
            if (searchObj[key] && typeof searchObj[key] === 'string') {
                var searchString_1 = searchObj[key].toLowerCase().toString();
                array = array.filter(function (f) {
                    if (f[key] && typeof f[key] === 'string') {
                        var value = f[key].toLowerCase().toString();
                        return value.includes(searchString_1);
                    }
                });
            }
        };
        for (var key in searchObj) {
            _loop_1(key);
        }
        return array;
    };
    return FilterPipe;
}());
FilterPipe = __decorate([
    core_1.Pipe({
        name: 'filter',
        pure: false
    })
], FilterPipe);
exports.FilterPipe = FilterPipe;
//# sourceMappingURL=scan-protocols.component.js.map