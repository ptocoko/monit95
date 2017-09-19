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
var class_service_1 = require("../class.service");
var particip_service_1 = require("../particip.service");
var ClassParticip_1 = require("./ClassParticip");
var AddClassParticipModalData = (function (_super) {
    __extends(AddClassParticipModalData, _super);
    function AddClassParticipModalData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AddClassParticipModalData;
}(bootstrap_1.BSModalContext));
exports.AddClassParticipModalData = AddClassParticipModalData;
var AddClassParticipModal = (function () {
    function AddClassParticipModal(dialog, http, classService, participService) {
        this.dialog = dialog;
        this.http = http;
        this.classService = classService;
        this.participService = participService;
        this.wasDoo = 'no';
        this.isUpdate = dialog.context.isUpdate;
        this.newMonth = -1;
        if (this.isUpdate) {
            this.particip = dialog.context.particip;
            this.particip.ClassName = this.particip.ClassName.trim();
            if (this.particip.Birthday) {
                this.newDay = this.particip.Birthday.getDate();
                this.newMonth = this.particip.Birthday.getMonth();
                this.newYear = this.particip.Birthday.getFullYear();
            }
            if (this.particip.WasDoo) {
                this.wasDoo = 'yes';
            }
            this.actionText = "Изменить";
        }
        else {
            this.particip = new ClassParticip_1.ClassParticip();
            this.actionText = "Добавить";
            this.schoolId = dialog.context.schoolId;
            this.projectId = dialog.context.projectId;
        }
    }
    AddClassParticipModal.prototype.ngOnInit = function () {
        var _this = this;
        this.statusText = "";
        this.classService.getClassNames().subscribe(function (classNames) {
            _this.classNames = classNames;
            _this.classNames.length = 12;
        }, function (error) {
            _this.statusText = "Ошибка соединения с базой данных! ";
            throw error;
        });
    };
    AddClassParticipModal.prototype.onSubmit = function () {
        var _this = this;
        this.particip.WasDoo = this.wasDoo === 'yes';
        if (this.newMonth === -1) {
            this.statusText = "Выберите месяц рождения!";
            return;
        }
        var birthdayInMiSeconds = new Date().setUTCFullYear(this.newYear, this.newMonth, this.newDay);
        this.particip.Birthday = new Date(birthdayInMiSeconds + 10800000);
        if (this.isUpdate) {
            this.participService.updateParticip(this.particip).subscribe(function (res) {
                _this.dialog.close(_this.particip);
            }, function (error) {
                _this.statusText = "Ошибка при обновлении участника!";
                throw error;
            });
        }
        else {
            this.particip.SchoolId = this.schoolId;
            this.particip.ProjectId = this.projectId;
            this.participService.addParticip(this.particip).subscribe(function (res) {
                _this.particip.Id = res;
                _this.dialog.close(_this.particip);
            }, function (error) {
                _this.statusText = "Ошибка при добавлении участника!";
                throw error;
            });
        }
    };
    AddClassParticipModal.prototype.cancel = function () {
        this.dialog.close();
    };
    return AddClassParticipModal;
}());
AddClassParticipModal = __decorate([
    core_1.Component({
        templateUrl: './app/class-particips/add-class-particip.modal.html'
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef,
        http_1.Http,
        class_service_1.ClassService,
        particip_service_1.ParticipService])
], AddClassParticipModal);
exports.AddClassParticipModal = AddClassParticipModal;
//# sourceMappingURL=add-class-particip.modal.js.map