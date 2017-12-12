"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var marks_service_1 = require("../../rsur/rsur-test-protocol/marks.service");
var particip_service_1 = require("../../particip.service");
var router_1 = require("@angular/router");
var CLASS_NAMES = ['Все классы', '1', '1 А', '1 Б', '1 В', '1 Г', '1 Д', '1 Е', '1 Ж', '1 З', '1 И', '1 К', '1 Л'];
var PROJECT_TEST_ID = 1011;
var ClassParticipMarksComponent = /** @class */ (function () {
    function ClassParticipMarksComponent(marksService, participService, router) {
        this.marksService = marksService;
        this.participService = participService;
        this.router = router;
        this.isLoading = true;
        this.participsWithoutMarks = 0;
        this.classes = CLASS_NAMES;
    }
    ClassParticipMarksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.marksService.getAll(PROJECT_TEST_ID).subscribe(function (res) {
            _this.particips = res.json();
            _this.participsWithoutMarks = _this.particips.filter(function (f) { return !f.Marks; }).length;
            _this.isLoading = false;
        });
    };
    ClassParticipMarksComponent.prototype.changeMarks = function (marksParticip) {
        this.router.navigate(['/class-particips/marks-edit', marksParticip.ParticipTestId]);
    };
    ClassParticipMarksComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/class-particips/marks/marks.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [marks_service_1.MarksService,
            particip_service_1.ParticipService,
            router_1.Router])
    ], ClassParticipMarksComponent);
    return ClassParticipMarksComponent;
}());
exports.ClassParticipMarksComponent = ClassParticipMarksComponent;
//# sourceMappingURL=marks.component.js.map