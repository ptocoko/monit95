"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var angular2_modal_1 = require("angular2-modal");
var http_1 = require("@angular/http");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var particip_model_1 = require("../particip.model");
var AddClassParticipModalData = (function (_super) {
    __extends(AddClassParticipModalData, _super);
    function AddClassParticipModalData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AddClassParticipModalData;
}(bootstrap_1.BSModalContext));
exports.AddClassParticipModalData = AddClassParticipModalData;
var AddClassParticipModal = (function () {
    function AddClassParticipModal(dialog, http) {
        this.dialog = dialog;
        this.http = http;
        this.isUpdate = dialog.context.isUpdate;
        this.schoolId = dialog.context.schoolId;
        if (this.isUpdate) {
            this.particip = dialog.context.particip;
            this.actionText = "Изменить";
        }
        else {
            this.particip = new particip_model_1.ParticipModel();
            this.actionText = "Добавить";
        }
    }
    AddClassParticipModal.prototype.ngOnInit = function () {
        this.classNames = ["1 A", "1 B", "1 E"];
    };
    AddClassParticipModal.prototype.onSubmit = function () {
        if (this.isUpdate) {
            //TODO: service for class particips
        }
        else {
        }
        this.dialog.close(this.particip);
    };
    return AddClassParticipModal;
}());
AddClassParticipModal = __decorate([
    core_1.Component({
        templateUrl: './app/class-particips/add-class-particip.modal.html'
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, http_1.Http])
], AddClassParticipModal);
exports.AddClassParticipModal = AddClassParticipModal;
//# sourceMappingURL=add-class-particip.modal.js.map