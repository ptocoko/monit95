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
var ResultsModalComponent = (function () {
    function ResultsModalComponent(dialog, participService) {
        this.dialog = dialog;
        this.participService = participService;
        this.results = [];
        this.particip = dialog.context;
        dialog.context.dialogClass = 'modal-dialog modal-mySize';
    }
    ResultsModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.participService.getParticipResults(this.particip.Code).subscribe(function (res) {
            _this.results = res;
        });
    };
    ResultsModalComponent.prototype.close = function () {
        this.dialog.close();
    };
    return ResultsModalComponent;
}());
ResultsModalComponent = __decorate([
    core_1.Component({
        selector: 'results-modal',
        templateUrl: './app/rsur/results/results-modal.html'
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, rsurparticip_service_1.RsurParticipService])
], ResultsModalComponent);
exports.ResultsModalComponent = ResultsModalComponent;
//# sourceMappingURL=results-modal.component.js.map