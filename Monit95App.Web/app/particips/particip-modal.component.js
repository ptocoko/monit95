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
var ParticipModalComponent = (function () {
    function ParticipModalComponent(dialog) {
        this.dialog = dialog;
        this.placeholder = 'дд.мм.гггг';
        this.statusText = '';
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
        };
        this.dateModel = { date: { year: 1985, month: 1, day: 1 } };
        this.particip = dialog.context;
        this.statusText = '';
        if (this.particip.birthday != null) {
            var BDay = this.particip.birthday;
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
        var participClasses = this.getClassesString();
        if (this.dateModel != null && participClasses != null) {
            var date = this.dateModel.date;
            this.particip.birthday = new Date(date.year, date.month - 1, date.day);
            this.particip.classes = participClasses;
            this.dialog.close(this.particip);
        }
        else {
            this.statusText = 'Не все значения указаны!';
        }
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
        template: "\n        <div style=\"width:100%;padding:15px\">\n\t\t\t<h3>{{particip.surname}} {{particip.name}} {{particip.secondName}}</h3>\n            <hr/>\n\t\t\t<label style=\"margin-left:33%\">\n\t\t\t\t\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F:</label>\n            <div style=\"width:40%;margin-left:30%\">\n                <form #myForm=\"ngForm\" novalidate>\n\t\t\t\t\t<my-date-picker [placeholder]=\"placeholder\" name=\"mydate\" [options]=\"myDatePickerOptions\"\n\t\t\t\t\t\t\t\t\t[(ngModel)]=\"dateModel\" required></my-date-picker>\n\t\t\t\t</form>\n            </div>\n\t\t\t<hr/>\n\t\t\t<div id=\"classes\">\n\t\t\t\t<label>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043B\u0430\u0441\u0441\u044B: </label>\n\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<input id=\"5\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t5\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<input id=\"6\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t6\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<input id=\"7\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t7\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<input id=\"8\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t8\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<input id=\"9\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t9\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<input id=\"10\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t10\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<input id=\"11\" type=\"checkbox\" value=\"\">\n\t\t\t\t\t\t11\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<hr/>\n\t\t\t<div style=\"text-align:right\">\n\t\t\t\t<span style=\"margin-right:20px;color:red\">{{statusText}}</span>\n\t\t\t\t<button class=\"btn btn-success\" (click)=\"save(particip)\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n\t\t\t\t<button class=\"btn btn-default btn-in-horizon\" (click)=\"cancel()\">\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C</button>\n\t\t\t</div>\n        </div>"
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef])
], ParticipModalComponent);
exports.ParticipModalComponent = ParticipModalComponent;
//# sourceMappingURL=particip-modal.component.js.map