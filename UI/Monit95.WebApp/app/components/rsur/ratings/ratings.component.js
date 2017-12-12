"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rsur_rating_service_1 = require("../../../services/rsur-rating.service");
var RatingsComponent = /** @class */ (function () {
    function RatingsComponent(rsurRatingService) {
        this.rsurRatingService = rsurRatingService;
        this.isLoading = true;
        this.selectedSubject = 'Русский язык';
    }
    RatingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rsurRatingService.getRatings().subscribe(function (response) {
            console.log(response);
            _this.ratings = response;
            _this.isLoading = false;
        });
    };
    RatingsComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'ratings',
            templateUrl: "./app/components/rsur/ratings/ratings.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_rating_service_1.RsurRatingService])
    ], RatingsComponent);
    return RatingsComponent;
}());
exports.RatingsComponent = RatingsComponent;
//# sourceMappingURL=ratings.component.js.map