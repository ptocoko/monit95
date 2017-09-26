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
var marks_service_1 = require("../../rsur/marks/marks.service");
var particip_service_1 = require("../../particip.service");
var router_1 = require("@angular/router");
var CLASS_NAMES = ['Все классы', '1', '1 А', '1 Б', '1 В', '1 Г', '1 Д', '1 Е', '1 Ж', '1 З', '1 И', '1 К', '1 Л'];
var PROJECT_TEST_ID = 1011;
exports.MAX_MARKS = [
    { Name: '1', MaxMark: 2 },
    { Name: '2', MaxMark: 3 },
    { Name: '3', MaxMark: 4 },
    { Name: '4', MaxMark: 1 }
];
var ClassParticipMarksComponent = (function () {
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
    return ClassParticipMarksComponent;
}());
ClassParticipMarksComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/class-particips/marks/marks.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [marks_service_1.MarksService,
        particip_service_1.ParticipService,
        router_1.Router])
], ClassParticipMarksComponent);
exports.ClassParticipMarksComponent = ClassParticipMarksComponent;
//# sourceMappingURL=marks.component.js.map