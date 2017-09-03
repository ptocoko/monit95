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
var angular2_modal_1 = require("angular2-modal");
var rsurparticip_service_1 = require("../rsurparticip.service");
var ParticipModalComponent = (function () {
    function ParticipModalComponent(dialog, participService) {
        this.dialog = dialog;
        this.participService = participService;
        this.placeholder = 'дд.мм.гггг';
        this.statusText = '';
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
        };
        this.dateModel = { date: { year: 1985, month: 1, day: 1 } };
        this.particip = dialog.context;
        this.statusText = '';
        if (this.particip.Birthday != null) {
            var BDay = this.particip.Birthday;
            this.dateModel = {
                date: {
                    year: BDay.getFullYear(),
                    month: BDay.getMonth() + 1,
                    day: BDay.getDate()
                }
            };
        }
        //this.wrongAnswer = true;
        //dialog.setCloseGuard(this);
    }
    ParticipModalComponent.prototype.cancel = function () {
        this.dialog.dismiss();
    };
    ParticipModalComponent.prototype.save = function () {
        //let participClasses = this.getClassesString();
        //if (this.dateModel != null && participClasses != null) {
        //	let date = this.dateModel.date;
        //	this.particip.birthday = new Date(date.year, date.month - 1, date.day, 12, 0, 0);
        //	this.particip.classNumbers = participClasses;
        //	this.participService.update(this.particip).subscribe(() => {
        //		this.dialog.close(this.particip);
        //	}, (error) => {
        //		this.statusText = 'Ошибка доступа к серверу!';
        //		throw error;
        //	});
        //}
        //else {
        //	this.statusText = 'Не все значения указаны!'
        //}
    };
    ParticipModalComponent.prototype.getClassesString = function () {
        var res = '';
        var checkboxes = $('#classes').find(':checkbox:checked');
        checkboxes.each(function (i, elem) {
            res += elem.id + '; ';
        });
        if (res.length > 0) {
            res = res.slice(0, res.length - 2);
            return res;
        }
        else
            return null;
    };
    return ParticipModalComponent;
}());
ParticipModalComponent = __decorate([
    core_1.Component({
        selector: 'modal-content',
        templateUrl: './app/rsur/details/particip-modal.html'
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, rsurparticip_service_1.RsurParticipService])
], ParticipModalComponent);
exports.ParticipModalComponent = ParticipModalComponent;
//# sourceMappingURL=particip-modal.component.js.map