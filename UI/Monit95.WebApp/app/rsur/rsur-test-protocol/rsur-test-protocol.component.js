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
var RsurTestProtocolComponent = (function () {
    function RsurTestProtocolComponent(route, location, marksService) {
        this.route = route;
        this.location = location;
        this.marksService = marksService;
        this.rsurParticip = new RsurParticipMarks();
    }
    RsurTestProtocolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var participTestId = params['id'];
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
                    if (_this.isAbsent) {
                        _this.marksInputs.each(function (i, elem) { return elem.setAttribute('disabled', 'disabled'); });
                    }
                });
            });
        });
    };
    RsurTestProtocolComponent.prototype.setAbsentStatus = function () {
        if (this.isAbsent) {
            this.marks.fill('X');
            this.marksInputs.each(function (i, elem) { return elem.setAttribute('disabled', 'disabled'); });
        }
        else {
            this.marks.fill('');
            this.marksInputs.each(function (i, elem) { return elem.removeAttribute('disabled'); });
        }
    };
    RsurTestProtocolComponent.prototype.onMarkChanged = function (event) {
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
    RsurTestProtocolComponent.prototype.goToNextInputOrFocusOnSubmitBtn = function (elemIndex) {
        if (elemIndex < this.marksInputs.length - 1) {
            var nextInput = this.marksInputs.get(elemIndex + 1);
            nextInput.focus();
        }
        else {
            $('#submitBtn').focus();
        }
    };
    RsurTestProtocolComponent.prototype.onSubmit = function () {
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
    RsurTestProtocolComponent.prototype.getCurrentMarksArray = function () {
        console.log(this.marks);
    };
    RsurTestProtocolComponent.prototype.cancel = function () {
        this.location.back();
    };
    return RsurTestProtocolComponent;
}());
RsurTestProtocolComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/rsur/rsur-test-protocol/rsur-test-protocol.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location,
        marks_service_1.MarksService])
], RsurTestProtocolComponent);
exports.RsurTestProtocolComponent = RsurTestProtocolComponent;
//# sourceMappingURL=rsur-test-protocol.component.js.map