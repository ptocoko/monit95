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
var particip_service_1 = require("./particip.service");
var ResultsModalComponent = (function () {
    function ResultsModalComponent(dialog, participService) {
        this.dialog = dialog;
        this.participService = participService;
        this.results = [];
        this.particip = dialog.context;
        dialog.context.dialogClass = 'modal-dialog modal-mySize';
    }
    ResultsModalComponent.prototype.ngOnInit = function () {
        this.getResults(this.particip.participCode);
    };
    ResultsModalComponent.prototype.getResults = function (participCode) {
        var _this = this;
        this.participService.getParticipResults(participCode).subscribe(function (res) {
            _this.results = res;
            console.log(JSON.stringify(_this.results)); //TODO: delete this!
        });
    };
    ResultsModalComponent.prototype.myRange = function (array) {
        var res = [];
        array.forEach(function (val, i, arr) {
            res.push(i);
        });
        return res;
    };
    return ResultsModalComponent;
}());
ResultsModalComponent = __decorate([
    core_1.Component({
        selector: 'results-modal',
        templateUrl: './app/particips/results-modal.html',
        providers: [particip_service_1.ParticipService]
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, particip_service_1.ParticipService])
], ResultsModalComponent);
exports.ResultsModalComponent = ResultsModalComponent;
//# sourceMappingURL=results-modal.component.js.map