"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolsProfileService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var SchoolsProfileService = /** @class */ (function () {
    function SchoolsProfileService(http) {
        this.http = http;
        this.endpoint = '/api/schools-profile';
    }
    SchoolsProfileService.prototype.getQuestions = function (id) {
        return this.http.get(this.endpoint + '/' + id);
    };
    SchoolsProfileService.prototype.saveAnswer = function (questionId, value, session) {
        return this.http.post(this.endpoint + '/' + questionId, { value: value, session: session }, { responseType: "text" });
    };
    SchoolsProfileService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], SchoolsProfileService);
    return SchoolsProfileService;
}());
exports.SchoolsProfileService = SchoolsProfileService;
//# sourceMappingURL=schools-profile.service.js.map