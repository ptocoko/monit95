"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var particip_service_1 = require("../../services/particip.service");
var account_service_1 = require("../../services/account.service");
var particip_model_1 = require("../../models/particip.model");
var router_1 = require("@angular/router");
var AddParticipComponent = /** @class */ (function () {
    function AddParticipComponent(participService, accountService, location, route) {
        this.participService = participService;
        this.accountService = accountService;
        this.location = location;
        this.route = route;
        this.particip = new particip_model_1.ParticipModel();
        this.isSending = false;
        this.isConflict = false;
    }
    AddParticipComponent.prototype.ngOnInit = function () {
        this.projectId = this.route.snapshot.data['projectId'];
        if (this.projectId === 18) {
            this.EgeOrOge = 'ЕГЭ';
        }
        else {
            this.EgeOrOge = 'ОГЭ';
        }
    };
    AddParticipComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isSending = true;
        this.isConflict = false;
        // избавляемся от пробелов в начале и в конце
        this.particip.Surname = this.particip.Surname.trim();
        this.particip.Name = this.particip.Name.trim();
        if (this.particip.SecondName) {
            this.particip.SecondName = this.particip.SecondName.trim();
        }
        ;
        this.participService.postParticip(this.particip, this.projectId).subscribe(function (_) {
            _this.back();
        }, function (error) {
            _this.isSending = false;
            if (error.status === 409) {
                _this.isConflict = true;
            }
            else {
                throw error;
            }
        });
    };
    AddParticipComponent.prototype.back = function () {
        this.location.back();
    };
    AddParticipComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/add-and-update/add.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/particips/add-and-update/add.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particip_service_1.ParticipService,
            account_service_1.AccountService,
            common_1.Location,
            router_1.ActivatedRoute])
    ], AddParticipComponent);
    return AddParticipComponent;
}());
exports.AddParticipComponent = AddParticipComponent;
//# sourceMappingURL=add.component.js.map