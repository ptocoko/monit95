"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var SeminarReportCreateFormComponent = /** @class */ (function () {
    function SeminarReportCreateFormComponent() {
        this.urls = [];
    }
    SeminarReportCreateFormComponent.prototype.ngOnInit = function () {
    };
    SeminarReportCreateFormComponent.prototype.readUrl = function (event) {
        var _this = this;
        var files = event.target.files; // event.target.files is FileList object        
        if (files) {
            for (var i = 0; i < files.length && i < 4; i++) {
                // The FileReader object lets web applications asynchronously read the contents of files stored on the user's computer, 
                // using File object to specify the file to read.
                var fileReader = new FileReader();
                // The fileReader.onload property contains an event handler executed when content read with readAsDataURL is available.
                fileReader.onload = function (event) {
                    _this.urls.push(event.target.result);
                };
                var file = files.item(i);
                if (file.size / 1024 / 1024 <= 15) {
                    // The readAsDataURL read the contents of the specified File. When the read operation is finished, 
                    // the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
                    fileReader.readAsDataURL(file);
                }
            }
        }
    };
    SeminarReportCreateFormComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/rsur/seminar-reports/create-form/create-form.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/seminar-reports/create-form/create-form.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SeminarReportCreateFormComponent);
    return SeminarReportCreateFormComponent;
}());
exports.SeminarReportCreateFormComponent = SeminarReportCreateFormComponent;
//# sourceMappingURL=create-form.component.js.map