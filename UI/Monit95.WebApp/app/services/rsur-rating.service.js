"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var RsurRatingService = /** @class */ (function () {
    function RsurRatingService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/rsur/ratings';
    }
    RsurRatingService.prototype.getRatings = function () {
        return this.http.get("" + this.ROUTE_PREFIX);
    };
    RsurRatingService.prototype.getMockRatings = function () {
        return this.http.get('/ratings.mock.json');
    };
    RsurRatingService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], RsurRatingService);
    return RsurRatingService;
}());
exports.RsurRatingService = RsurRatingService;
//# sourceMappingURL=rsur-rating.service.js.map