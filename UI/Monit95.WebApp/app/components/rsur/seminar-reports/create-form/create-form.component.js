"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var seminar_report_service_1 = require("../../../../services/seminar-report.service");
var material_1 = require("@angular/material");
var SeminarReportCreateFormComponent = /** @class */ (function () {
    function SeminarReportCreateFormComponent(seminarReportService, snackBar) {
        var _this = this;
        this.seminarReportService = seminarReportService;
        this.snackBar = snackBar;
        //fotoBase64Strings: string[] = [];
        this.seminarFiles = [];
        this.protocolFileName = '';
        this.maxFileSize = 15728640; // 15 MB 
        this.acceptedFileExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'pdf'];
        this.getNotProtocolFiles = function () { return _this.seminarFiles.filter(function (f) { return f.isProtocol === false; }); };
        this.getProtocolFiles = function () { return _this.seminarFiles.filter(function (f) { return f.isProtocol === true; }); };
    }
    //maxFiles = 3;
    //fileId = 1; // id for first file
    //ngOnInit() {
    //}
    //getProtocolFileName(event: any) {
    //    const fileList = event.target.files as FileList;        
    //    if (fileList.length > 0) {
    //        this.protocolFileName = fileList.item(0).name;
    //    }
    //}
    SeminarReportCreateFormComponent.prototype.addFiles = function (files, isProtocol) {
        if (isProtocol === void 0) { isProtocol = false; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var i, seminarFile, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(files);
                        console.log(isProtocol);
                        if (!this.validateFiles(files, isProtocol)) return [3 /*break*/, 5];
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < files.length)) return [3 /*break*/, 4];
                        _a = {
                            // 
                            key: isProtocol ? 'protocol' : "image_" + this.seminarFiles.length,
                            isProtocol: isProtocol,
                            file: files[i]
                        };
                        return [4 /*yield*/, this.getBase64String(files[i])];
                    case 2:
                        seminarFile = (_a.base64String = _b.sent(),
                            _a);
                        this.seminarFiles.push(seminarFile);
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log(this.seminarFiles);
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SeminarReportCreateFormComponent.prototype.getBase64String = function (file) {
        return new Promise(function (resolve, reject) {
            var fileReader = new FileReader();
            fileReader.onload = function () { return resolve(fileReader.result); };
            fileReader.onerror = function (error) { return reject(error.message); };
            fileReader.readAsDataURL(file);
        });
    };
    SeminarReportCreateFormComponent.prototype.sendFiles = function () {
        var formData = new FormData();
        for (var _i = 0, _a = this.seminarFiles; _i < _a.length; _i++) {
            var seminarImage = _a[_i];
            formData.append(seminarImage.key, seminarImage.file, seminarImage.file.name);
        }
        this.seminarReportService.postFiles(formData);
    };
    SeminarReportCreateFormComponent.prototype.validateFiles = function (files, isProtocolFiles) {
        for (var i = 0; i < files.length; i++) {
            if (this.acceptedFileExtensions.indexOf(getFileExtension(files[i].name)) < 0) {
                this.showMessage('неподдерживаемый тип файла: ' + files[i].name);
                return false;
            }
            if (files[i].size > this.maxFileSize) {
                this.showMessage("\u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430 " + files[i].name + " \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 15 \u041C\u0411");
                return false;
            }
        }
        if (!isProtocolFiles) {
            if (files.length > 4 || this.getNotProtocolFiles().length + files.length > 4) {
                this.showMessage('максимально разрешенное количество фотографий — 4');
                return false;
            }
        }
        else {
            if (files.length > 1 || this.getProtocolFiles().length > 0) {
                this.showMessage('нельзя добавить больше одного файла протокола');
                return false;
            }
        }
        return true;
    };
    SeminarReportCreateFormComponent.prototype.showMessage = function (message, actionText) {
        if (actionText === void 0) { actionText = 'OK'; }
        this.snackBar.open(message, actionText, { duration: 3000 });
    };
    //readBase64Strings(eventTarget: any) {        
    //    const files = eventTarget.files as FileList; 
    //    if (files.length > 0) {
    //        for (let i = 0; i < files.length; i++) {
    //            // The FileReader object lets web applications asynchronously read the contents of files stored on the user's computer, 
    //            // using File object to specify the file to read.
    //            const fileReader = new FileReader();
    //            // The fileReader.onload property contains an event handler executed when content read with readAsDataURL is available.
    //            fileReader.onload = (event: any) => {
    //                const base64EncodedString = event.target.result;
    //                if (this.fotoBase64Strings.length < 4 // не больше 4-х фотографий будут учитываться
    //                    && this.fotoBase64Strings.indexOf(base64EncodedString) === -1) {
    //                    this.fotoBase64Strings.push(base64EncodedString);
    //                }
    //            };
    //            const file = files.item(i);
    //            if (file.size <= this.maxFileSize) {
    //                // The readAsDataURL read the contents of the specified File. When the read operation is finished, 
    //                // the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
    //                fileReader.readAsDataURL(file);
    //            }
    //        }
    //        // Очищаем список, чтобы можно было повторно обработать этот же массив файлов
    //        eventTarget.value = '';
    //    }        
    //}
    SeminarReportCreateFormComponent.prototype.remove = function (index) {
        console.log(index);
        this.seminarFiles.splice(index, 1);
    };
    SeminarReportCreateFormComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/rsur/seminar-reports/create-form/create-form.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/seminar-reports/create-form/create-form.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [seminar_report_service_1.SeminarReportService, material_1.MatSnackBar])
    ], SeminarReportCreateFormComponent);
    return SeminarReportCreateFormComponent;
}());
exports.SeminarReportCreateFormComponent = SeminarReportCreateFormComponent;
function getFileExtension(name) {
    return name.split('.').pop().toLowerCase();
}
//# sourceMappingURL=create-form.component.js.map