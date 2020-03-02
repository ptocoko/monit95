"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var schools_profile_service_1 = require("../../../services/schools-profile/schools-profile.service");
var school_collector_service_1 = require("../../../shared/school-collector.service");
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
    ProfileComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/schools-profile/profile/profile.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/schools-profile/profile/profile.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [schools_profile_service_1.SchoolsProfileService, school_collector_service_1.SchoolCollectorService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map