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
var RsurParticipMarks = (function () {
    function RsurParticipMarks() {
    }
    return RsurParticipMarks;
}());
exports.RsurParticipMarks = RsurParticipMarks;
var RsurParticipMarksUpload = (function () {
    function RsurParticipMarksUpload() {
    }
    return RsurParticipMarksUpload;
}());
exports.RsurParticipMarksUpload = RsurParticipMarksUpload;
var RsurParticipMarksChange = (function () {
    function RsurParticipMarksChange(route, router, marksService) {
        this.route = route;
        this.router = router;
        this.marksService = marksService;
    }
    RsurParticipMarksChange.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var participId = params['participId'];
            _this.marksService.getMarksByRsurParticipId(participId).subscribe(function (res) {
                _this.rsurParticip = res;
                _this.marks = res.Marks ? res.Marks.split(';') : new Array(res.MarkNames.length);
                $(document).ready(function () {
                    _this.marksInputs = $('.markInput');
                    _this.marksInputs.get(0).focus();
                    _this.marksInputs.get(0).select();
                    _this.marksInputs.focus(function (event) { return event.target.select(); });
                });
            });
        });
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
        var rsurParticipUpload = {
            ParticipTestId: this.rsurParticip.ParticipTestId,
            Marks: this.marks.join(';')
        };
    };
    RsurParticipMarksChange.prototype.getCurrentMarksArray = function () {
        console.log(this.marks);
    };
    return RsurParticipMarksChange;
}());
RsurParticipMarksChange = __decorate([
    core_1.Component({
        templateUrl: "./app/rsur/marks/marks-change.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        marks_service_1.MarksService])
], RsurParticipMarksChange);
exports.RsurParticipMarksChange = RsurParticipMarksChange;
//# sourceMappingURL=marks-change.component.js.map