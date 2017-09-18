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
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var angular2_modal_1 = require("angular2-modal");
var marks_edit_modal_1 = require("./marks-edit.modal");
var PROJECT_TEST_ID = 12;
var ClassParticipMarksComponent = (function () {
    function ClassParticipMarksComponent(marksService, participService, modal) {
        this.marksService = marksService;
        this.participService = participService;
        this.modal = modal;
        this.isLoading = true;
    }
    ClassParticipMarksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.marksService.getAll(PROJECT_TEST_ID).subscribe(function (res) {
            _this.particips = res.json();
            console.log(res.json());
            console.log(_this.particips);
            _this.isLoading = false;
        });
    };
    ClassParticipMarksComponent.prototype.changeMarks = function (marksParticip) {
        this.modal.open(marks_edit_modal_1.ClassParticipMarksEditModal, angular2_modal_1.overlayConfigFactory({ particip: marksParticip }, bootstrap_1.BSModalContext)).then(function (dialog) {
            dialog.result.then(function (particip) {
                //TODO: release that!
            }).catch(function () { });
        });
    };
    return ClassParticipMarksComponent;
}());
ClassParticipMarksComponent = __decorate([
    core_1.Component({
        templateUrl: './app/class-particips/marks/marks.component.html'
    }),
    __metadata("design:paramtypes", [marks_service_1.MarksService,
        particip_service_1.ParticipService,
        bootstrap_1.Modal])
], ClassParticipMarksComponent);
exports.ClassParticipMarksComponent = ClassParticipMarksComponent;
//# sourceMappingURL=marks.component.js.map