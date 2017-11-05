"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rsur_rating_service_1 = require("../../../services/rsur-rating.service");
var RatingsComponent = (function () {
    function RatingsComponent(rsurRatingService) {
        this.rsurRatingService = rsurRatingService;
        this.isLoading = true;
        this.selectedSubject = 'Русский язык';
    }
    RatingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rsurRatingService.getMockRatings().subscribe(function (response) {
            console.log(response);
            _this.ratings = response;
            _this.isLoading = false;
        });
    };
    return RatingsComponent;
}());
RatingsComponent = __decorate([
    core_1.Component({
        selector: 'ratings',
        templateUrl: "./app/components/rsur/ratings/ratings.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [rsur_rating_service_1.RsurRatingService])
], RatingsComponent);
exports.RatingsComponent = RatingsComponent;
//# sourceMappingURL=ratings.component.js.map