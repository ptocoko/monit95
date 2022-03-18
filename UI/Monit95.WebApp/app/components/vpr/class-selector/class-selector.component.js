"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSelectorComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var class_service_1 = require("../../../services/class.service");
var vpr_service_1 = require("../../../services/vpr.service");
var ClassSelectorComponent = /** @class */ (function () {
    function ClassSelectorComponent(vprService, classService) {
        this.vprService = vprService;
        this.classService = classService;
        this.classSelected = new core_1.EventEmitter();
        this.classes = [];
        this.areas = [];
        this.schools = [];
        this.isLoading = true;
        this.classesMap = {
            '04': '4 класс',
            '05': '5 класс',
            '06': '6 класс',
            '07': '7 класс',
            '08': '8 класс',
        };
        this.subjectsMap = {
            '01': 'Русский язык',
            '02': 'Математика',
            '03': 'Физика',
            '06': 'Биология',
            '07': 'История',
            '08': 'География',
            '12': 'Обществознание',
            '24': 'Окружающий мир'
        };
    }
    ClassSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.vprService.getClasses().subscribe(function (cls) {
            /*this.classes = cls;*/
            _this.classes = ['04', '05', '06', '07', '08'];
            _this.isLoading = false;
        });
    };
    ClassSelectorComponent.prototype.selectClass = function (classNumber) {
        var _this = this;
        this.selectedClass = classNumber;
        this.subjects = null;
        this.selectedSubject = null;
        this.areas = null;
        this.selectedArea = null;
        this.schools = null;
        this.selectedSchool = null;
        this.classSelected.emit(null);
        console.log('class');
        this.isLoading = true;
        this.vprService.getSubjects(this.selectedClass).subscribe(function (sjs) {
            /*this.subjects = sjs;*/
            _this.subjects = ['01', '02', '03', '06', '07', '08', '12', '24'];
            _this.isLoading = false;
        });
    };
    ClassSelectorComponent.prototype.selectSubject = function (subjectCode) {
        var _this = this;
        this.selectedSubject = subjectCode;
        this.areas = null;
        this.selectedArea = null;
        this.schools = null;
        this.selectedSchool = null;
        this.classSelected.emit(null);
        this.isLoading = true;
        console.log('subje');
        // This is for showing all areas even if they donot have results yet
        this.vprService.getAreas("bypass", "bypass").subscribe(function (areas) {
            _this.areas = areas;
            _this.isLoading = false;
            console.log('dwd');
        });
    };
    ClassSelectorComponent.prototype.selectArea = function (areaCode) {
        var _this = this;
        this.selectedArea = areaCode;
        this.schools = null;
        this.selectedSchool = null;
        this.classSelected.emit(null);
        console.log('area');
        this.isLoading = true;
        this.vprService.getSchools("classNumber", this.selectedSubject, this.selectedArea).subscribe(function (schools) {
            _this.schools = schools;
            _this.isLoading = false;
            _this.AbleSendSecond = false;
        });
    };
    ClassSelectorComponent.prototype.ableSendSecond = function (schoolId) {
        this.vprService.canSendSecond(this.selectedClass, this.selectedSubject, schoolId).subscribe(function () {
        });
        this.AbleSendSecond = false;
    };
    ClassSelectorComponent.prototype.selectSchool = function (schoolId) {
        this.vprService.getSchools(this.selectedClass, this.selectedSubject, this.selectedArea).subscribe(function (schools) {
        });
        this.selectedSchool = schoolId;
        var classInfo = {
            Subject: this.selectedSubject,
            ClassNumber: this.selectedClass,
            AreaCode: this.selectedArea,
            SchoolId: this.selectedSchool
        };
        console.log(classInfo);
        this.classSelected.emit(classInfo);
    };
    tslib_1.__decorate([
        (0, core_1.Output)(),
        tslib_1.__metadata("design:type", Object)
    ], ClassSelectorComponent.prototype, "classSelected", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Boolean)
    ], ClassSelectorComponent.prototype, "isLoadingFromOuter", void 0);
    ClassSelectorComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/vpr/class-selector/class-selector.component.html?v=".concat(new Date().getTime()),
            selector: 'monit-class-selector',
            styles: [
                ".toggle-group { margin-top: 45px; }"
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [vpr_service_1.VprService, class_service_1.ClassService])
    ], ClassSelectorComponent);
    return ClassSelectorComponent;
}());
exports.ClassSelectorComponent = ClassSelectorComponent;
//# sourceMappingURL=class-selector.component.js.map