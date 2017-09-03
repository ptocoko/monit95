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
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var edit_modal_component_1 = require("./edit-modal.component");
var rsurparticip_service_1 = require("../rsurparticip.service");
var account_service_1 = require("../../account.service");
var EditParticipComponent = (function () {
    function EditParticipComponent(participService, accountService, modal) {
        this.participService = participService;
        this.accountService = accountService;
        this.modal = modal;
    }
    //ngOnInit() {
    //    this.participService.get().subscribe(particips => this.particips = particips);
    //}
    EditParticipComponent.prototype.modalOpen = function (particip) {
        var _this = this;
        this.modal.open(edit_modal_component_1.EditModalComponent, angular2_modal_1.overlayConfigFactory(particip, bootstrap_1.BSModalContext)).then(function (dialog) {
            dialog.result.then(function (res) {
                _this.setDataByParticipCode(res);
            }).catch(function () {
            });
        });
    };
    EditParticipComponent.prototype.setDataByParticipCode = function (particip) {
        this.particips.forEach(function (val, i, arr) {
            if (val.Code === particip.Code) {
                return;
            }
        });
    };
    return EditParticipComponent;
}());
EditParticipComponent = __decorate([
    core_1.Component({
        selector: 'edit-particip',
        templateUrl: './app/rsur/edit-particip/edit-particip.html',
        providers: [bootstrap_1.Modal]
    }),
    __metadata("design:paramtypes", [rsurparticip_service_1.RsurParticipService,
        account_service_1.AccountService,
        bootstrap_1.Modal])
], EditParticipComponent);
exports.EditParticipComponent = EditParticipComponent;
//# sourceMappingURL=edit-particip.component.js.map