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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var marks_service_1 = require("../../rsur/marks/marks.service");
var material_1 = require("@angular/material");
var MAX_MARKS = [
    { Name: '1', MaxMark: 2 },
    { Name: '2', MaxMark: 3 },
    { Name: '3', MaxMark: 4 },
    { Name: '4', MaxMark: 1 }
];
var ClassParticipMarksEditModal = (function () {
    function ClassParticipMarksEditModal(dialogRef, data, marksService) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.marksService = marksService;
        this.marksArray = [];
        this.particip = data.particip;
        //this.particip.Marks = '1; 2; 3.5; 0.5';
        this.maxMarks = MAX_MARKS;
        if (this.particip.Marks) {
            var marks = this.particip.Marks;
            marks.split(';').map(function (mark) {
                _this.marksArray.push(mark.trim());
            });
        }
    }
    ClassParticipMarksEditModal.prototype.onSubmit = function () {
        console.log(this.marksArray);
        this.particip.Marks = this.marksArray.join('; ');
    };
    ClassParticipMarksEditModal.prototype.toNext = function () {
        this.dialogRef.close({ toNext: true });
    };
    ClassParticipMarksEditModal.prototype.cancel = function () {
        this.dialogRef.close();
    };
    return ClassParticipMarksEditModal;
}());
ClassParticipMarksEditModal = __decorate([
    core_1.Component({
        templateUrl: "./app/class-particips/marks/marks-edit.modal.html?v=" + new Date().getTime()
    }),
    __param(1, core_1.Inject(material_1.MD_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MdDialogRef, Object, marks_service_1.MarksService])
], ClassParticipMarksEditModal);
exports.ClassParticipMarksEditModal = ClassParticipMarksEditModal;
//# sourceMappingURL=marks-edit.modal.js.map