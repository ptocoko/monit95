"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var class_service_1 = require("../../../services/class.service");
var vpr_service_1 = require("../../../services/vpr.service");
var HomeComponent = /** @class */ (function () {
    //showUnblockBtn = false;
    function HomeComponent(vprService, classService) {
        this.vprService = vprService;
        this.classService = classService;
        this.classes = [
            {
                number: '04',
                name: '4 класс',
                subjects: [
                    { code: '01', name: 'Русский язык' },
                    { code: '02', name: 'Математика' },
                    { code: '24', name: 'Окружающий мир' },
                ]
            },
            {
                number: '05',
                name: '5 класс',
                subjects: [
                    { code: '01', name: 'Русский язык' },
                    { code: '02', name: 'Математика' },
                    { code: '06', name: 'Биология' },
                    { code: '07', name: 'История' },
                ]
            },
            {
                number: '06',
                name: '6 класс',
                subjects: [
                    { code: '01', name: 'Русский язык' },
                    { code: '02', name: 'Математика' },
                ]
            },
            {
                number: '07',
                name: '7 класс',
                subjects: [
                    { code: '01', name: 'Русский язык' },
                    { code: '02', name: 'Математика' },
                    { code: '03', name: 'Физика' },
                    { code: '06', name: 'Биология' },
                    { code: '07', name: 'История' },
                    { code: '08', name: 'География' },
                    { code: '12', name: 'Обществознание' },
                ]
            },
            {
                number: '08',
                name: '8 класс',
                subjects: [
                    { code: '01', name: 'Русский язык' },
                    { code: '02', name: 'Математика' },
                ]
            },
        ];
        this.minMax = {
            '04': {
                '01': {
                    min2: 15,
                    min4: 40,
                    max5: 5
                },
                '02': {
                    min2: 12,
                    min4: 40,
                    max5: 8,
                },
                '24': {
                    min2: 10,
                    min4: 40,
                    max5: 5
                },
            },
            '05': {
                '01': {
                    min2: 15,
                    min4: 40,
                    max5: 5
                },
                '02': {
                    min2: 15,
                    min4: 40,
                    max5: 8,
                },
                '06': {
                    min2: 15,
                    min4: 40,
                    max5: 5,
                },
                '07': {
                    min2: 12,
                    min4: 40,
                    max5: 8,
                }
            },
            '06': {
                '01': {
                    min2: 15,
                    min4: 40,
                    max5: 6,
                },
                '02': {
                    min2: 15,
                    min4: 40,
                    max5: 6,
                },
            },
            '07': {
                '01': {
                    min2: 15,
                    min4: 40,
                    max5: 5,
                },
                '02': {
                    min2: 15,
                    min4: 40,
                    max5: 5,
                },
                '03': {
                    min2: 15,
                    min4: 40,
                    max5: 5,
                },
                '06': {
                    min2: 15,
                    min4: 40,
                    max5: 5,
                },
                '07': {
                    min2: 13,
                    min4: 40,
                    max5: 5,
                },
                '08': {
                    min2: 15,
                    min4: 40,
                    max5: 4,
                },
                '12': {
                    min2: 16,
                    min4: 40,
                    max5: 5
                }
            },
            '08': {
                '01': {
                    min2: 20,
                    min4: 40,
                    max5: 5,
                },
                '02': {
                    min2: 15,
                    min4: 40,
                    max5: 5,
                },
            },
        };
        this.classNames = [];
        this.newSchoolMarks = [];
        this.blocked = false;
        this.hasFirst = false;
        this.hasSecond = false;
        this.showErrors = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.classService.getClasses().subscribe(function (c) { return _this.classNames = c.filter(function (cl) { return !cl.Id.endsWith('00'); }); });
    };
    HomeComponent.prototype.AvgSum = function () {
        var _this = this;
        var _a, _b, _c;
        var count = 0;
        this.totalAvgGrades = [];
        this.totalEachAvgGrads = [];
        var pushMarks = function (mark, num) {
            if (mark) {
                if (typeof _this.totalAvgGrades[num] == "undefined") {
                    _this.totalAvgGrades[num] = [];
                }
                _this.totalAvgGrades[num][count] = mark;
            }
        };
        this.newSchoolMarks.forEach(function (vals) {
            pushMarks(vals.Marks2, 0);
            pushMarks(vals.Marks3, 1);
            pushMarks(vals.Marks4, 2);
            pushMarks(vals.Marks5, 3);
            count += 1;
        });
        for (var i = 0; i < ((_a = this.totalAvgGrades) === null || _a === void 0 ? void 0 : _a.length); i++) {
            var lengthOfTotal = (_b = this.totalAvgGrades[i]) === null || _b === void 0 ? void 0 : _b.length;
            this.totalEachAvgGrads[i] = 0;
            for (var j = 0; j < ((_c = this.totalAvgGrades[i]) === null || _c === void 0 ? void 0 : _c.length); j++) {
                this.totalEachAvgGrads[i] += this.totalAvgGrades[i][j];
            }
            this.totalEachAvgGrads[i] = Math.round(((this.totalEachAvgGrads[i] / lengthOfTotal) + Number.EPSILON) * 100) / 100;
            if (!this.totalAvgGrades[i]) {
                this.totalEachAvgGrads[i] = 0;
            }
        }
        console.log(this.totalEachAvgGrads);
    };
    HomeComponent.prototype.getClassesByNumber = function () {
        var _this = this;
        return this.classNames.filter(function (c) { return c.Id.substring(0, 2) === _this.selectedClass.number; });
    };
    HomeComponent.prototype.classChanged = function (e) {
        this.selectedClass = e.value;
        this.selectedSubj = null;
        this.showErrors = false;
    };
    HomeComponent.prototype.subjectChanged = function (e) {
        this.selectedSubj = e.value;
        this.getWeekResult();
    };
    HomeComponent.prototype.getWeekResult = function () {
        var _this = this;
        this.weekResults = null;
        this.newSchoolMarks = [];
        this.blocked = false;
        this.showErrors = false;
        this.hasFirst = false;
        this.hasSecond = false;
        this.vprService.getSchoolWeek(this.selectedClass.number, this.selectedSubj.code).subscribe(function (res) {
            if (res.length > 0) {
                _this.weekResults = res[res.length - 1];
                _this.newSchoolMarks = _this.weekResults.VprSchoolMarks;
                _this.hasFirst = true;
                _this.blocked = true;
                if (res.length === 2) {
                    _this.hasSecond = true;
                }
                else if (_this.hasAnyError()) {
                    _this.showErrors = true;
                }
                _this.AvgSum();
            }
            else {
                _this.totalEachAvgGrads = [null, null, null, null];
                _this.weekResults = {};
                _this.newSchoolMarks = [];
                _this.hasFirst = false;
                _this.hasSecond = false;
            }
        });
    };
    HomeComponent.prototype.getMark = function (markName, classId) {
        var _a;
        return (_a = this.newSchoolMarks.filter(function (m) { return m.ClassId === classId; })[0]) === null || _a === void 0 ? void 0 : _a[markName];
    };
    HomeComponent.prototype.setMark = function (markName, classId, val) {
        var _a;
        if (val === '') {
            var schoolMarks_1 = this.newSchoolMarks.filter(function (m) { return m.ClassId === classId; })[0];
            schoolMarks_1[markName] = undefined;
            if (!valueOrZero(schoolMarks_1.Marks2) && !valueOrZero(schoolMarks_1.Marks3) && !valueOrZero(schoolMarks_1.Marks4) && !valueOrZero(schoolMarks_1.Marks5)) {
                this.newSchoolMarks = this.newSchoolMarks.filter(function (m) { return m.ClassId !== classId; });
            }
            else {
                this.newSchoolMarks = this.newSchoolMarks.filter(function (m) { return m.ClassId !== classId; }).concat([schoolMarks_1]);
            }
            return;
        }
        if (isNaN(+val)) {
            return;
        }
        val = +val;
        var schoolMarks = this.newSchoolMarks.filter(function (m) { return m.ClassId === classId; })[0];
        if (schoolMarks) {
            schoolMarks[markName] = val;
        }
        else {
            schoolMarks = (_a = {}, _a[markName] = val, _a.ClassId = classId, _a);
        }
        this.newSchoolMarks = this.newSchoolMarks.filter(function (m) { return m.ClassId !== classId; }).concat([schoolMarks]);
    };
    HomeComponent.prototype.isClassRowsValid = function () {
        return this.newSchoolMarks.length > 0 && this.newSchoolMarks.every(function (m) { return valueOrZero(m.Marks2) && valueOrZero(m.Marks3) && valueOrZero(m.Marks4) && valueOrZero(m.Marks5); });
    };
    HomeComponent.prototype.checkForm = function () {
        var _this = this;
        if (confirm('В систему предупреждения необъективного оценивания ВПР на monit95  результаты необходимо вносить только после того, как будут проведены ВПР во всей параллели одного класса!')) {
            var weekRes = {
                ClassNumber: this.selectedClass.number,
                SubjectCode: this.selectedSubj.code,
                VprSchoolMarks: this.newSchoolMarks,
                HasError: this.hasAnyError(),
                IsSecond: this.hasFirst
            };
            this.vprService.saveSchoolWeek(weekRes).subscribe(function () {
                _this.blocked = true;
                _this.hasFirst = true;
                if (_this.hasAnyError()) {
                    _this.showErrors = true;
                }
            });
        }
    };
    HomeComponent.prototype.unblock = function () {
        this.blocked = false;
        this.showErrors = false;
    };
    HomeComponent.prototype.sendSecond = function () {
        var _this = this;
        if (confirm('Уважаемый Хож-Бауди Буарович! Настоящим я подтверждаю, что результаты ВПР нашей школы, в которых  ЦОКО были выявлены признаки необъективности, нами перепроверены. Объективность перепроверенных результатов удостоверяю.')) {
            this.weekResults.ClassNumber = this.selectedClass.number;
            this.weekResults.SubjectCode = this.selectedSubj.code;
            this.weekResults.HasError = this.hasAnyError();
            this.weekResults.IsSecond = true;
            this.weekResults.VprSchoolMarks = this.newSchoolMarks;
            this.vprService.saveSchoolWeek(this.weekResults).subscribe(function () {
                _this.blocked = true;
                _this.hasSecond = true;
            });
        }
    };
    HomeComponent.prototype.hasAnyError = function () {
        if (!this.selectedClass || !this.selectedSubj) {
            return false;
        }
        var min2 = this.minMax[this.selectedClass.number][this.selectedSubj.code].min2;
        var max5 = this.minMax[this.selectedClass.number][this.selectedSubj.code].max5;
        return !this.isClassRowsValid() || this.newSchoolMarks.some(function (m) { return m.Marks2 < min2 || m.Marks5 > max5 || Math.round(m.Marks2 + m.Marks3 + m.Marks4 + m.Marks5) !== 100; });
    };
    HomeComponent.prototype.isMark2HasError = function (classId) {
        var minMax = this.minMax[this.selectedClass.number][this.selectedSubj.code];
        var schoolMarks = this.newSchoolMarks.filter(function (m) { return m.ClassId === classId; })[0];
        if (!schoolMarks) {
            return false;
        }
        return schoolMarks.Marks2 < minMax.min2;
    };
    HomeComponent.prototype.isMark4HasError = function (classId) {
        var minMax = this.minMax[this.selectedClass.number][this.selectedSubj.code];
        var schoolMarks = this.newSchoolMarks.filter(function (m) { return m.ClassId === classId; })[0];
        if (!schoolMarks) {
            return false;
        }
        return schoolMarks.Marks2 < minMax.min2;
    };
    HomeComponent.prototype.isMark5HasError = function (classId) {
        var minMax = this.minMax[this.selectedClass.number][this.selectedSubj.code];
        var schoolMarks = this.newSchoolMarks.filter(function (m) { return m.ClassId === classId; })[0];
        if (!schoolMarks) {
            return false;
        }
        return schoolMarks.Marks5 > minMax.max5;
    };
    HomeComponent.prototype.isRowHasError = function (classId) {
        var m = this.newSchoolMarks.filter(function (m) { return m.ClassId === classId; })[0];
        if (!m) {
            return false;
        }
        return Math.round(m.Marks2 + m.Marks3 + m.Marks4 + m.Marks5) !== 100;
    };
    HomeComponent.prototype.isItogoHasError = function () {
        if (!this.totalEachAvgGrads) {
            return false;
        }
        return Math.round(this.totalEachAvgGrads[0] + this.totalEachAvgGrads[1] + this.totalEachAvgGrads[2] + this.totalEachAvgGrads[3]) !== 100;
    };
    HomeComponent.prototype.isAnyRowNotHundreed = function () {
        if (this.newSchoolMarks.length === 0) {
            return false;
        }
        return this.newSchoolMarks.some(function (clMarks) { return Math.round(clMarks.Marks2 + clMarks.Marks3 + clMarks.Marks4 + clMarks.Marks5) !== 100; });
    };
    HomeComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/vpr/home/home.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/vpr/home/home.component.css?v=".concat(new Date().getTime())],
        }),
        tslib_1.__metadata("design:paramtypes", [vpr_service_1.VprService, class_service_1.ClassService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
function valueOrZero(val) {
    return !!val || val === 0;
}
//# sourceMappingURL=home.component.js.map