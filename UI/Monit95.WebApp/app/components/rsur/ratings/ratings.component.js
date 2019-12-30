var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { RsurRatingService } from '../../../services/rsur-rating.service';
var RatingsComponent = /** @class */ (function () {
    function RatingsComponent(rsurRatingService) {
        this.rsurRatingService = rsurRatingService;
        this.isLoading = true;
        this.selectedSubject = 'Русский язык';
    }
    RatingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rsurRatingService.getRatings().subscribe(function (response) {
            //console.log(response);
            _this.ratings = response;
            _this.isLoading = false;
        });
    };
    RatingsComponent = __decorate([
        Component({
            selector: 'ratings',
            templateUrl: './ratings.component.html',
        }),
        __metadata("design:paramtypes", [RsurRatingService])
    ], RatingsComponent);
    return RatingsComponent;
}());
export { RatingsComponent };
//# sourceMappingURL=ratings.component.js.map