"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var particip_service_1 = require("../services/particip.service");
var PROJECT_ID = 201801; // "i pass ege" projectId
var ParticipsListComponent = /** @class */ (function () {
    function ParticipsListComponent(participService, router) {
        this.participService = participService;
        this.router = router;
        this.isLoading = true;
    }
    ParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.participService.getAll(PROJECT_ID).subscribe(function (res) {
            _this.particips = res;
            _this.isLoading = false;
        });
    };
    ParticipsListComponent.prototype.addClassParticip = function () {
        this.router.navigate(['/new']);
    };
    ParticipsListComponent.prototype.updateClassParticip = function (classParticip) {
        this.router.navigate(['/update', classParticip.Id]);
    };
    ParticipsListComponent.prototype.deleteClassParticip = function (particip) {
        var _this = this;
        var index = this.particips.indexOf(particip);
        var isDelete = confirm('Вы уверены что хотите удалить данную запись?');
        if (isDelete) {
            this.participService.deleteParticip(particip.Id).subscribe(function (res) {
                _this.particips.splice(index, 1);
            });
        }
    };
    ParticipsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/class-particips/particips-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/class-particips/particips-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particip_service_1.ParticipService,
            router_1.Router])
    ], ParticipsListComponent);
    return ParticipsListComponent;
}());
exports.ParticipsListComponent = ParticipsListComponent;
//# sourceMappingURL=particips-list.component.js.map