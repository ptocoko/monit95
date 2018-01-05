"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var SeminarReportCreateFormComponent = /** @class */ (function () {
    function SeminarReportCreateFormComponent() {
        this.fotoBase64Strings = [];
        this.protocolFileName = '';
        this.maxFileSize = 15728640; // 15 MB 
        this.maxFiles = 3;
        this.fileId = 1; // id for first file
    }
    SeminarReportCreateFormComponent.prototype.ngOnInit = function () {
    };
    SeminarReportCreateFormComponent.prototype.getProtocolFileName = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            this.protocolFileName = fileList.item(0).name;
        }
    };
    SeminarReportCreateFormComponent.prototype.readBase64Strings = function (eventTarget) {
        var _this = this;
        var files = eventTarget.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                // The FileReader object lets web applications asynchronously read the contents of files stored on the user's computer, 
                // using File object to specify the file to read.
                var fileReader = new FileReader();
                // The fileReader.onload property contains an event handler executed when content read with readAsDataURL is available.
                fileReader.onload = function (event) {
                    var base64EncodedString = event.target.result;
                    if (_this.fotoBase64Strings.length < 4 // не больше 4-х фотографий будут учитываться
                        && _this.fotoBase64Strings.indexOf(base64EncodedString) === -1) {
                        _this.fotoBase64Strings.push(base64EncodedString);
                    }
                };
                var file = files.item(i);
                if (file.size <= this.maxFileSize) {
                    // The readAsDataURL read the contents of the specified File. When the read operation is finished, 
                    // the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
                    fileReader.readAsDataURL(file);
                }
            }
            // Очищаем список, чтобы можно было повторно обработать этот же массив файлов
            eventTarget.value = '';
        }
    };
    SeminarReportCreateFormComponent.prototype.remove = function (index) {
        console.log(index);
        this.fotoBase64Strings.splice(index, 1);
    };
    SeminarReportCreateFormComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/rsur/seminar-reports/create-form/create-form.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/seminar-reports/create-form/create-form.component.css?v=" + new Date().getTime()]
        })
    ], SeminarReportCreateFormComponent);
    return SeminarReportCreateFormComponent;
}());
exports.SeminarReportCreateFormComponent = SeminarReportCreateFormComponent;
//# sourceMappingURL=create-form.component.js.map