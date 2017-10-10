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
var router_1 = require("@angular/router");
var marks_service_1 = require("./marks.service");
var common_1 = require("@angular/common");
var RsurParticipMarks = (function () {
    function RsurParticipMarks() {
    }
    return RsurParticipMarks;
}());
exports.RsurParticipMarks = RsurParticipMarks;
var RsurParticipMarksChange = (function () {
    function RsurParticipMarksChange(route, location, marksService) {
        this.route = route;
        this.location = location;
        this.marksService = marksService;
        this.rsurParticip = new RsurParticipMarks();
    }
    RsurParticipMarksChange.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var participTestId = params['participTestId'];
            _this.marksService.getMarksByRsurParticipTestId(participTestId).subscribe(function (res) {
                _this.rsurParticip = res.json();
                _this.markNames = _this.rsurParticip.MarkNames;
                if (_this.rsurParticip.Marks) {
                    _this.marks = _this.rsurParticip.Marks.split(';');
                    _this.isUpdate = true;
                    if (_this.marks[0] === 'X') {
                        _this.isAbsent = true;
                    }
                }
                else {
                    _this.marks = new Array(_this.markNames.length);
                    _this.isUpdate = false;
                }
                $(document).ready(function () {
                    _this.marksInputs = $('.markInput');
                    _this.marksInputs.get(0).focus();
                    _this.marksInputs.get(0).select();
                    _this.marksInputs.focus(function (event) { return event.target.select(); });
                });
            });
        });
    };
    RsurParticipMarksChange.prototype.setAbsentStatus = function () {
        if (this.isAbsent) {
            this.marks = this.marks.fill('');
            this.marksInputs.each(function (i, el) { return el.removeAttribute('disabled'); });
            this.isAbsent = false;
        }
        else {
            this.marks = this.marks.fill('X');
            this.marksInputs.each(function (i, el) { return el.setAttribute('disabled', 'disabled'); });
            this.isAbsent = true;
        }
    };
    RsurParticipMarksChange.prototype.onMarkChanged = function (event) {
        var elem = event.target;
        var elemIndex = this.marksInputs.index(elem);
        if (elem.value) {
            if (elem.value.match(/^(1|0)$/)) {
                this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
            }
            else {
                elem.value = '1';
                this.marks[elemIndex] = '1';
                this.goToNextInputOrFocusOnSubmitBtn(elemIndex);
            }
        }
    };
    RsurParticipMarksChange.prototype.goToNextInputOrFocusOnSubmitBtn = function (elemIndex) {
        if (elemIndex < this.marksInputs.length - 1) {
            var nextInput = this.marksInputs.get(elemIndex + 1);
            nextInput.focus();
        }
        else {
            $('#submitBtn').focus();
        }
    };
    RsurParticipMarksChange.prototype.onSubmit = function () {
        var _this = this;
        var rsurParticipUpload = {
            participTestId: this.rsurParticip.ParticipTestId,
            marks: this.marks.join(';')
        };
        if (this.isUpdate) {
            this.marksService.updateRsurMarks(rsurParticipUpload).subscribe(function (res) { return _this.location.back(); });
        }
        else {
            this.marksService.addRsurMarks(rsurParticipUpload).subscribe(function (res) { return _this.location.back(); });
        }
    };
    RsurParticipMarksChange.prototype.getCurrentMarksArray = function () {
        console.log(this.marks);
    };
    RsurParticipMarksChange.prototype.cancel = function () {
        this.location.back();
    };
    return RsurParticipMarksChange;
}());
RsurParticipMarksChange = __decorate([
    core_1.Component({
        templateUrl: "./app/rsur/marks/marks-change.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location,
        marks_service_1.MarksService])
], RsurParticipMarksChange);
exports.RsurParticipMarksChange = RsurParticipMarksChange;
//# sourceMappingURL=marks-change.component.js.map