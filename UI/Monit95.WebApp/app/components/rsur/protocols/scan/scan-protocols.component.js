"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rsur_protocols_service_1 = require("../../../../services/rsur-protocols.service");
var ScanProtocolsComponent = /** @class */ (function () {
    function ScanProtocolsComponent(rsurProtocolsService) {
        var _this = this;
        this.rsurProtocolsService = rsurProtocolsService;
        this.answerSheets = [];
        this.allCompleteCount = function () { return _this.answerSheets.filter(function (f) { return f.FileId; }).length; };
        this.notMatchedCount = function () { return _this.answerSheets.filter(function (s) { return !s.ParticipCode && (s.Status === 'isComplete' || !s.Status); }).length; };
        this.failsCount = function () { return _this.answerSheets.filter(function (s) { return s.Status === 'isFailed'; }).length; };
        this.isPageLoading = false;
    }
    ScanProtocolsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isPageLoading = true;
        this.rsurProtocolsService.getAnswerSheets().subscribe(function (res) {
            _this.answerSheets = res;
            _this.isPageLoading = false;
        });
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
        if (res instanceof http_1.HttpResponse) { //запрос возвращает сначала статус загрузки в процентах, а после загрузки FileId
            answerSheet.FileId = res.body; //этот кусок кода для того чтобы отличить FileId от процента загрузки файла
            answerSheet.FileContent = null; //очищаем FileContent после отправки чтобы не забивать оперативную память
        }
        else {
            answerSheet.UploadProgress = res;
        }
    };
    ScanProtocolsComponent.prototype.errorResponseHandler = function (error, answerSheet) {
        if (error.status && error.status === 409) { //если ошибка имеет код 409 отмечаем файл как дубликат, т.е. убираем из списка
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
        if (confirm('Вы уверены? \nЭто действие нельзя будет отменить')) {
            var statusBeforeDeleting_1 = answerSheet.Status;
            answerSheet.Status = 'isDeleting';
            if (statusBeforeDeleting_1 !== 'isFailed') {
                this.rsurProtocolsService.deleteScan(answerSheet.FileId).subscribe(function (res) { return _this.answerSheets.splice(_this.answerSheets.indexOf(answerSheet), 1); }, function (error) {
                    var message = error.message ? error.message : error;
                    alert(message);
                    console.error(error);
                    answerSheet.Status = statusBeforeDeleting_1;
                });
            }
            else {
                this.answerSheets.splice(this.answerSheets.indexOf(answerSheet), 1);
            }
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
    ScanProtocolsComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'scan-protocols-component',
            templateUrl: "./app/components/rsur/protocols/scan/scan-protocols.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/protocols/scan/scan-protocols.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_protocols_service_1.RsurProtocolsService])
    ], ScanProtocolsComponent);
    return ScanProtocolsComponent;
}());
exports.ScanProtocolsComponent = ScanProtocolsComponent;
//попытка сделать один общий фильтр pipe
var FilterPipe = /** @class */ (function () {
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
    FilterPipe = tslib_1.__decorate([
        core_1.Pipe({
            name: 'filter',
            pure: false
        })
    ], FilterPipe);
    return FilterPipe;
}());
exports.FilterPipe = FilterPipe;
//# sourceMappingURL=scan-protocols.component.js.map