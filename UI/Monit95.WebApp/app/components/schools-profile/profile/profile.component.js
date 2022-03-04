"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var schools_profile_service_1 = require("../../../services/schools-profile/schools-profile.service");
var school_collector_service_1 = require("../../../shared/school-collector.service");
var router_1 = require("@angular/router");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(profileService, schoolCollectorService, router) {
        this.profileService = profileService;
        this.schoolCollectorService = schoolCollectorService;
        this.router = router;
        this.COLLECTOR_ID = 127;
        this.questions = [];
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
            else {
                _this.loadQuestions();
            }
        }, function (err) {
            if (err.status === 404) {
                alert("От Вашей школы не было участников ЕГЭ-2021, поэтому заполнение анкеты Вами не требуется");
                window.location.href = '/';
            }
            else {
                throw err;
            }
        });
    };
    Object.defineProperty(ProfileComponent.prototype, "isAllRequiredFilled", {
        get: function () {
            return this.questions.filter(function (q) { return q.Required; }).every(function (q) { return q.Value !== null && q.Value !== undefined && q.Value !== ''; });
        },
        enumerable: false,
        configurable: true
    });
    ProfileComponent.prototype.onSessionValuePassed = function (question, session, value) {
        if (!!value || value === 0) {
            this.profileService.saveAnswer(question.Id, value, session).subscribe();
        }
    };
    ProfileComponent.prototype.onValuePassed = function (question, value) {
        if (!!value || value === 0) {
            this.profileService.saveAnswer(question.Id, value).subscribe();
        }
    };
    ProfileComponent.prototype.onRadioSelected = function (question, value) {
        if (!!value || value === 0) {
            this.profileService.saveAnswer(question.Id, value).subscribe();
        }
    };
    ProfileComponent.prototype.finish = function () {
        var _this = this;
        this.schoolCollectorService.isFinished(this.COLLECTOR_ID, true).subscribe(function (res) { return _this.isFinished = true; });
    };
    ProfileComponent.prototype.notFinished = function () {
        var _this = this;
        this.schoolCollectorService.isFinished(this.COLLECTOR_ID, false).subscribe(function (res) { _this.isFinished = false; _this.loadQuestions(); });
    };
    ProfileComponent.prototype.loadQuestions = function () {
        var _this = this;
        var profileId = this.router.snapshot.params['id'];
        this.profileService.getQuestions(profileId).subscribe(function (res) {
            _this.questions = res;
            _this.isLoading = false;
        });
    };
    ProfileComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/schools-profile/profile/profile.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/schools-profile/profile/profile.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [schools_profile_service_1.SchoolsProfileService,
            school_collector_service_1.SchoolCollectorService,
            router_1.ActivatedRoute])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map