"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var class_service_1 = require("../../../services/class.service");
var vpr_service_1 = require("../../../services/vpr.service");
var StatsComponent = /** @class */ (function () {
    function StatsComponent(vprService, classService) {
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
        ];
        this.minMax = {
            '04': {
                '01': {
                    min2: 15,
                    max4: 40,
                    max5: 5
                },
                '02': {
                    min2: 12,
                    max4: 40,
                    max5: 8,
                },
                '24': {
                    min2: 10,
                    max4: 40,
                    max5: 5
                },
            },
            '05': {
                '01': {
                    min2: 15,
                    max4: 40,
                    max5: 5
                },
                '02': {
                    min2: 15,
                    max4: 40,
                    max5: 8,
                },
                '06': {
                    min2: 15,
                    max4: 40,
                    max5: 5,
                },
                '07': {
                    min2: 12,
                    max4: 40,
                    max5: 8,
                }
            },
            '06': {
                '01': {
                    min2: 15,
                    max4: 40,
                    max5: 6,
                },
                '02': {
                    min2: 15,
                    max4: 40,
                    max5: 6,
                },
            },
            '07': {
                '01': {
                    min2: 15,
                    max4: 40,
                    max5: 5,
                },
                '02': {
                    min2: 15,
                    max4: 40,
                    max5: 5,
                },
                '03': {
                    min2: 15,
                    max4: 40,
                    max5: 5,
                },
                '06': {
                    min2: 15,
                    max4: 40,
                    max5: 5,
                },
                '07': {
                    min2: 13,
                    max4: 40,
                    max5: 5,
                },
                '08': {
                    min2: 15,
                    max4: 40,
                    max5: 4,
                },
                '12': {
                    min2: 16,
                    max4: 40,
                    max5: 5
                }
            },
            '08': {
                '01': {
                    min2: 20,
                    max4: 40,
                    max5: 5,
                },
                '02': {
                    min2: 15,
                    max4: 40,
                    max5: 5,
                },
            },
        };
        this.sums = {};
        this.availableClassIds = [];
        /*	classNames: { [classId: string]: string };
        */ this.classNames = [];
    }
    StatsComponent.prototype.ngOnInit = function () {
        this.classService.getClasses().subscribe(function (c) {
            var classes = c.filter(function (cl) { return !cl.Id.endsWith('00'); });
            /*this.classNames = classes.reduce((clAgg, curr) => {
                clAgg[curr.Id] = curr.Name;
                return clAgg;
            }, {});*/
        });
    };
    StatsComponent.prototype.onClassSelected = function (classSelectedInfo) {
        var _this = this;
        if (classSelectedInfo) {
            this.isLoading = true;
            this.selectedInfo = classSelectedInfo;
            this.vprService.getStats(this.selectedInfo.ClassNumber, this.selectedInfo.Subject, this.selectedInfo.SchoolId).subscribe(function (stats) {
                var _a, _b, _c, _d;
                if (stats == null) {
                    _this.stats = {
                        Marks2: (_a = {}, _a[_this.selectedInfo.ClassNumber] = { First: "", Second: "" }, _a),
                        Marks3: (_b = {}, _b[_this.selectedInfo.ClassNumber] = { First: "", Second: "" }, _b),
                        Marks4: (_c = {}, _c[_this.selectedInfo.ClassNumber] = { First: "", Second: "" }, _c),
                        Marks5: (_d = {}, _d[_this.selectedInfo.ClassNumber] = { First: "", Second: "" }, _d),
                    };
                }
                else {
                    _this.stats = stats;
                }
                _this.availableClassIds = Object.keys(_this.stats.Marks2).filter(function (cl) { return !cl.startsWith('$'); });
                _this.calculateSums();
                _this.isLoading = false;
            });
        }
        else {
            this.stats = null;
            this.selectedInfo = null;
        }
    };
    StatsComponent.prototype.validateMin2 = function (val) {
        var _a, _b;
        var value = +(val === null || val === void 0 ? void 0 : val.replace(',', '.'));
        if (!isNaN(value) && !!val) {
            return value < this.minMax[(_a = this.selectedInfo) === null || _a === void 0 ? void 0 : _a.ClassNumber][(_b = this.selectedInfo) === null || _b === void 0 ? void 0 : _b.Subject].min2;
        }
        return false;
    };
    StatsComponent.prototype.validateMax4 = function (val) {
        var _a, _b;
        var value = +(val === null || val === void 0 ? void 0 : val.replace(',', '.'));
        if (!isNaN(value) && !!val) {
            return value > this.minMax[(_a = this.selectedInfo) === null || _a === void 0 ? void 0 : _a.ClassNumber][(_b = this.selectedInfo) === null || _b === void 0 ? void 0 : _b.Subject].max4;
        }
        return false;
    };
    StatsComponent.prototype.validateMax5 = function (val) {
        var _a, _b;
        var value = +(val === null || val === void 0 ? void 0 : val.replace(',', '.'));
        if (!isNaN(value) && !!val) {
            return value > this.minMax[(_a = this.selectedInfo) === null || _a === void 0 ? void 0 : _a.ClassNumber][(_b = this.selectedInfo) === null || _b === void 0 ? void 0 : _b.Subject].max5;
        }
        return false;
    };
    StatsComponent.prototype.calculateSums = function () {
        var _this = this;
        this.availableClassIds.forEach(function (cl) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            _this.sums[cl] = [];
            var sumFirst = (+((_a = _this.stats.Marks2[cl].First) === null || _a === void 0 ? void 0 : _a.replace(',', '.'))) + (+((_b = _this.stats.Marks3[cl].First) === null || _b === void 0 ? void 0 : _b.replace(',', '.'))) + (+((_c = _this.stats.Marks4[cl].First) === null || _c === void 0 ? void 0 : _c.replace(',', '.'))) + (+((_d = _this.stats.Marks5[cl].First) === null || _d === void 0 ? void 0 : _d.replace(',', '.')));
            var sumSecond = (+((_e = _this.stats.Marks2[cl].Second) === null || _e === void 0 ? void 0 : _e.replace(',', '.'))) + (+((_f = _this.stats.Marks3[cl].Second) === null || _f === void 0 ? void 0 : _f.replace(',', '.'))) + (+((_g = _this.stats.Marks4[cl].Second) === null || _g === void 0 ? void 0 : _g.replace(',', '.'))) + (+((_h = _this.stats.Marks5[cl].Second) === null || _h === void 0 ? void 0 : _h.replace(',', '.')));
            _this.sums[cl][0] = +(sumFirst === null || sumFirst === void 0 ? void 0 : sumFirst.toFixed(1));
            _this.sums[cl][1] = +(sumSecond === null || sumSecond === void 0 ? void 0 : sumSecond.toFixed(1));
        });
    };
    StatsComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/vpr/statistics/stats.component.html?v=".concat(new Date().getTime()),
            styles: ["\ntable {\n\tmargin-top: 30px;\n}\ntd {\n\ttext-align: center;\n}\n.yellow-bgrd {\n\tbackground-color: orange;\n}\n"]
        }),
        tslib_1.__metadata("design:paramtypes", [vpr_service_1.VprService, class_service_1.ClassService])
    ], StatsComponent);
    return StatsComponent;
}());
exports.StatsComponent = StatsComponent;
//# sourceMappingURL=stats.component.js.map