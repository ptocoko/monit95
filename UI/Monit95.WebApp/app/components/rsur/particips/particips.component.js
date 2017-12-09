"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
// Services
var rsur_particip_service_1 = require("../../../services/rsur-particip.service");
var account_service_1 = require("../../../services/account.service");
var RsurParticipsComponent = /** @class */ (function () {
    function RsurParticipsComponent(rsurParticipService, accountService) {
        this.rsurParticipService = rsurParticipService;
        this.accountService = accountService;
        this.particips = [];
        this.isShowNotActual = false;
        this.displayedColumns = ['Code', 'Surname', 'Name', 'SecondName', 'RsurSubjectName', 'SchoolIdWithName'];
        this.dataSource = new material_1.MatTableDataSource();
        this.isLoading = true;
    }
    RsurParticipsComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('start...');
        this.rsurParticipService.getAll()
            .subscribe(function (response) {
            _this.particips = response.json();
            _this.dataSource = new material_1.MatTableDataSource(_this.particips);
            _this.isLoading = false;
            _this.dataSource.sort = _this.sort;
        });
    };
    tslib_1.__decorate([
        core_1.ViewChild(material_1.MatSort),
        tslib_1.__metadata("design:type", material_1.MatSort)
    ], RsurParticipsComponent.prototype, "sort", void 0);
    RsurParticipsComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'rsur/particips',
            templateUrl: "./app/components/rsur/particips/particips.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/particips/particips.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_particip_service_1.RsurParticipService,
            account_service_1.AccountService])
    ], RsurParticipsComponent);
    return RsurParticipsComponent;
}());
exports.RsurParticipsComponent = RsurParticipsComponent;
;
//# sourceMappingURL=particips.component.js.map