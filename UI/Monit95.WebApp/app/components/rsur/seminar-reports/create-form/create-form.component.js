"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var SeminarReportCreateFormComponent = /** @class */ (function () {
    function SeminarReportCreateFormComponent() {
    }
    SeminarReportCreateFormComponent.prototype.ngOnInit = function () {
    };
    SeminarReportCreateFormComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files);
            // The FileReader object lets web applications asynchronously read the contents of files  stored on the user's computer, 
            // using File or Blob objects to specify the file to read.
            var fileReader = new FileReader();
            // The fileReader.onload property contains an event handler executed when content read with readAsDataURL is available.
            fileReader.onload = function (event) {
                _this.url = event.target.result;
            };
            fileReader.readAsDataURL(event.target.files[0]);
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