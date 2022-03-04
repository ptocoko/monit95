"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var CardsService = /** @class */ (function () {
    function CardsService(http) {
        this.http = http;
        this.endpoint = '/api/cards';
    }
    CardsService.prototype.getForSchool = function (projectTestId) {
        return this.http.get("".concat(this.endpoint, "/").concat(projectTestId), { responseType: 'blob' });
    };
    CardsService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], CardsService);
    return CardsService;
}());
exports.CardsService = CardsService;
//# sourceMappingURL=cards.service.js.map