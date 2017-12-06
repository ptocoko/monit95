"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_protocols_service_1 = require("../../../services/rsur-protocols.service");
var http_1 = require("@angular/common/http");
var ScanProtocolsComponent = (function () {
    function ScanProtocolsComponent(rsurProtocolsService, _iterableDiffers, differs) {
        this.rsurProtocolsService = rsurProtocolsService;
        this._iterableDiffers = _iterableDiffers;
        this.differs = differs;
        this.answerSheets = [];
        this.isPageLoading = false;
        //подготовка для отслеживания изменения массива
        this.iterableDiffer = _iterableDiffers.find([]).create(null);
    }
    ScanProtocolsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.objDiffer = {};
        this.isPageLoading = true;
        this.rsurProtocolsService.getAnswerSheets().subscribe(function (res) {
            _this.answerSheets = res;
            _this.isPageLoading = false;
            //подготовка differ'а для отслеживания изменений внутри объектов массива
            _this.answerSheets.forEach(function (elt) {
                _this.objDiffer[elt] = _this.differs.find(elt).create();
            });
        });
    };
    //ngDoCheck — часть жизненного цикла Angular (https://goo.gl/jBuc6s)
    ScanProtocolsComponent.prototype.ngDoCheck = function () {
        var _this = this;
        //если выявлены изменения в массиве или внутри объектов массива, то выполняется обновление статистических показателей
        var isChanged = false;
        var changes = this.iterableDiffer.diff(this.answerSheets);
        if (changes) {
            isChanged = true;
        }
        this.answerSheets.forEach(function (elt) {
            var objDiffer = _this.objDiffer[elt];
            var objChanges = objDiffer.diff(elt);
            if (objChanges) {
                isChanged = true;
            }
        });
        if (isChanged) {
            this.getStats();
        }
    };
    ScanProtocolsComponent.prototype.getStats = function () {
        this.allCompleteCount = this.answerSheets.filter(function (f) { return f.FileId; }).length;
        this.notMatchedCount = this.answerSheets.filter(function (s) { return !s.ParticipCode && s.Status !== 'isFailed'; }).length;
        this.failsCount = this.answerSheets.filter(function (s) { return s.Status === 'isFailed'; }).length;
    };
    ScanProtocolsComponent.prototype.addPhoto = function (event) {
        var files = event.target.files;
        if (this.validateSelectedPhotos(files)) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var answerSheet = {
                    SourceName: file.name,
                    UploadProgress: 0,
                    FileContent: file,
                    FileId: null,
                    Status: 'isUploading'
                };
                this.answerSheets.push(answerSheet);
                this.uploadScan(answerSheet);
            }
        }
        event.target.value = '';
    };
    ScanProtocolsComponent.prototype.uploadScan = function (answerSheet) {
        var _this = this;
        answerSheet.Status = 'isUploading';
        this.rsurProtocolsService.postScan(answerSheet.FileContent).subscribe(function (response) { return _this.responseHandler(response, answerSheet); }, function (error) { return _this.errorResponseHandler(error, answerSheet); }, function () { return answerSheet.Status = 'isComplete'; });
    };
    ScanProtocolsComponent.prototype.responseHandler = function (res, answerSheet) {
        if (res instanceof http_1.HttpResponse) {
            answerSheet.FileId = res.body; //этот кусок кода для того чтобы отличить FileId от процента загрузки файла
            answerSheet.FileContent = null; //очищаем FileContent после отправки чтобы не забивать оперативную память
        }
        else {
            answerSheet.UploadProgress = res;
        }
    };
    ScanProtocolsComponent.prototype.errorResponseHandler = function (error, answerSheet) {
        if (error.status && error.status === 409) {
            var duplicatedScanIndex = this.answerSheets.indexOf(answerSheet);
            this.answerSheets.splice(duplicatedScanIndex, 1);
            this.duplicatesCount += 1;
        }
        else {
            answerSheet.Status = 'isFailed';
        }
    };
    //перед удалением бланка ответов проверяем, был ли он загружен на сервер
    //если файла нет на сервере то достаточно удалить его из массива
    ScanProtocolsComponent.prototype.deleteScan = function (answerSheet) {
        var _this = this;
        var statusBeforeDeleting = answerSheet.Status;
        answerSheet.Status = 'isDeleting';
        if (statusBeforeDeleting !== 'isFailed') {
            this.rsurProtocolsService.deleteScan(answerSheet.FileId).subscribe(function (res) { return _this.answerSheets.splice(_this.answerSheets.indexOf(answerSheet), 1); }, function (error) {
                var message = error.message ? error.message : error;
                alert(message);
                console.error(error);
                answerSheet.Status = statusBeforeDeleting;
            });
        }
        else {
            this.answerSheets.splice(this.answerSheets.indexOf(answerSheet), 1);
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
            if (['png', 'jpg', 'jpeg', 'tiff', 'tif'].indexOf(files[i].name.split('.').pop().toLowerCase()) === -1) {
                alert('Файл ' + files[i].name + ' имеет неразрешенный формат.\nРазрешены следующие форматы файлов: .png, .jpg, .jpeg, .tiff, .tif');
                return false;
            }
        }
        return true;
    };
    return ScanProtocolsComponent;
}());
ScanProtocolsComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'scan-protocols-component',
        templateUrl: "./app/components/rsur/protocols/scan-protocols.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/protocols/scan-protocols.component.css?v=" + new Date().getTime()]
    }),
    tslib_1.__metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService,
        core_1.IterableDiffers,
        core_1.KeyValueDiffers])
], ScanProtocolsComponent);
exports.ScanProtocolsComponent = ScanProtocolsComponent;
//попытка сделать один общий фильтр pipe
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (array, searchObj) {
        if (array && array.length > 1) {
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
        }
        return array;
    };
    return FilterPipe;
}());
FilterPipe = tslib_1.__decorate([
    core_1.Pipe({
        name: 'filter',
        pure: false
    })
], FilterPipe);
exports.FilterPipe = FilterPipe;
//# sourceMappingURL=scan-protocols.component.js.map