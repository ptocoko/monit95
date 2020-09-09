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
import { SchoolsProfileService } from '../../../services/schools-profile/schools-profile.service';
import { SchoolCollectorService } from '../../../shared/school-collector.service';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(profileService, schoolCollectorService) {
        this.profileService = profileService;
        this.schoolCollectorService = schoolCollectorService;
        this.COLLECTOR_ID = 86;
        this.notBooleanQuestions = [];
        this.booleanQuestions = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.isFinished = false;
        this.schoolCollectorService.getCollectorState(this.COLLECTOR_ID).subscribe(function (state) {
            if (state.IsFinished) {
                _this.isLoading = false;
                _this.isFinished = true;
            }
            _this.profileService.getQuestions().subscribe(function (res) {
                _this.notBooleanQuestions = res[0];
                _this.booleanQuestions = res[1];
                _this.isLoading = false;
            });
        });
    };
    ProfileComponent.prototype.onSessionValuePassed = function (question, session, value) {
        this.profileService.saveAnswer(question.Id, value, session).subscribe();
    };
    ProfileComponent.prototype.onValuePassed = function (question, value) {
        this.profileService.saveAnswer(question.Id, value).subscribe();
    };
    ProfileComponent.prototype.onRadioSelected = function (question, value) {
        this.profileService.saveAnswer(question.Id, value).subscribe();
    };
    ProfileComponent.prototype.finish = function () {
        var _this = this;
        this.schoolCollectorService.isFinished(this.COLLECTOR_ID, true).subscribe(function (res) { return _this.isFinished = true; });
    };
    ProfileComponent.prototype.notFinished = function () {
        var _this = this;
        this.schoolCollectorService.isFinished(this.COLLECTOR_ID, false).subscribe(function (res) { return _this.isFinished = false; });
    };
    ProfileComponent = __decorate([
        Component({
            templateUrl: "./profile.component.html",
            styleUrls: ["./profile.component.css"]
        }),
        __metadata("design:paramtypes", [SchoolsProfileService, SchoolCollectorService])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map