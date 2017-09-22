"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var marks_edit_modal_1 = require("./marks-edit.modal");
var material_1 = require("@angular/material");
var PROJECT_TEST_ID = 12;
var ClassParticipMarksComponent = (function () {
    function ClassParticipMarksComponent(marksService, participService, dialog) {
        this.marksService = marksService;
        this.participService = participService;
        this.dialog = dialog;
        this.isLoading = true;
    }
    ClassParticipMarksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.marksService.getAll(PROJECT_TEST_ID).subscribe(function (res) {
            _this.particips = res.json();
            _this.isLoading = false;
        });
    };
    ClassParticipMarksComponent.prototype.changeMarks = function (marksParticip) {
        var _this = this;
        var index = this.particips.indexOf(marksParticip);
        var dialogRef = this.dialog.open(marks_edit_modal_1.ClassParticipMarksEditModal, { data: { particip: __assign({}, marksParticip) } });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res ? res.particip : res) {
                _this.particips[index] = res.particip;
                if (res.toNext) {
                    for (var i = index + 1; i < _this.particips.length; i++) {
                        if (!_this.particips[i].Marks) {
                            _this.changeMarks(_this.particips[i]);
                            return;
                        }
                    }
                }
            }
        });
    };
    return ClassParticipMarksComponent;
}());
ClassParticipMarksComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/class-particips/marks/marks.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [marks_service_1.MarksService,
        particip_service_1.ParticipService,
        material_1.MdDialog])
], ClassParticipMarksComponent);
exports.ClassParticipMarksComponent = ClassParticipMarksComponent;
//# sourceMappingURL=marks.component.js.map