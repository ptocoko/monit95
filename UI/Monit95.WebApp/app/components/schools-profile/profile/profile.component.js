"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var schools_profile_service_1 = require("../../../services/schools-profile/schools-profile.service");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(profileService) {
        this.profileService = profileService;
        this.notBooleanQuestions = [];
        this.booleanQuestions = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profileService.getQuestions().subscribe(function (res) {
            _this.notBooleanQuestions = res[0];
            _this.booleanQuestions = res[1];
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
    ProfileComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/schools-profile/profile/profile.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/schools-profile/profile/profile.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [schools_profile_service_1.SchoolsProfileService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map