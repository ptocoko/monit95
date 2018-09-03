"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var of_1 = require("rxjs/observable/of");
var ActualizationService = /** @class */ (function () {
    function ActualizationService(http) {
        this.http = http;
        this.endpoint = 'api/actualization';
        this.status = true;
    }
    ActualizationService.prototype.getActualizeStatus = function () {
        //return this.http.get<boolean>(`${this.endpoint}/status`);
        return of_1.of(this.status);
    };
    ActualizationService.prototype.endActualization = function () {
        //return this.http.put(`${this.endpoint}/status`, { 'status': ActualizationStatuses['Актуализация окончена'] }, { responseType: 'text' });
        this.status = false;
        return of_1.of(this.status);
    };
    ActualizationService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ActualizationService);
    return ActualizationService;
}());
exports.ActualizationService = ActualizationService;
var ActualizationStatuses;
(function (ActualizationStatuses) {
    ActualizationStatuses[ActualizationStatuses["\u0410\u043A\u0442\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u043A\u043E\u043D\u0447\u0435\u043D\u0430"] = 0] = "\u0410\u043A\u0442\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u043A\u043E\u043D\u0447\u0435\u043D\u0430";
    ActualizationStatuses[ActualizationStatuses["\u0410\u043A\u0442\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043D\u0435 \u043E\u043A\u043E\u043D\u0447\u0435\u043D\u0430"] = 1] = "\u0410\u043A\u0442\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043D\u0435 \u043E\u043A\u043E\u043D\u0447\u0435\u043D\u0430";
})(ActualizationStatuses = exports.ActualizationStatuses || (exports.ActualizationStatuses = {}));
//# sourceMappingURL=actualization.service.js.map