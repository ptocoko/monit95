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
var material_1 = require("@angular/material");
// Services
var rsur_particip_service_1 = require("../../../services/rsur-particip.service");
var account_service_1 = require("../../../services/account.service");
var RsurParticipsComponent = (function () {
    function RsurParticipsComponent(rsurParticipService, accountService) {
        this.rsurParticipService = rsurParticipService;
        this.accountService = accountService;
        this.particips = [];
        //account = new AccountModel();
        this.isShowNotActual = false;
        this.displayedColumns = ['Code', 'Surname', 'Name', 'SecondName', 'RsurSubjectName', 'SchoolIdWithName'];
        this.dataSource = new material_1.MatTableDataSource();
        this.isLoading = true;
    }
    RsurParticipsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rsurParticipService.getAll()
            .subscribe(function (response) {
            _this.particips = response.json();
            _this.particips = _this.particips.filter(function (f) { return f.ActualCode === 1; });
            _this.dataSource = new material_1.MatTableDataSource(_this.particips);
            _this.isLoading = false;
            _this.dataSource.sort = _this.sort;
        });
        //this.accountService.getAccount().subscribe(data => {            
        //    this.account = data.json() as AccountModel;           
        //});
    };
    return RsurParticipsComponent;
}());
__decorate([
    core_1.ViewChild(material_1.MatSort),
    __metadata("design:type", material_1.MatSort)
], RsurParticipsComponent.prototype, "sort", void 0);
RsurParticipsComponent = __decorate([
    core_1.Component({
        selector: 'rsur/particips',
        templateUrl: "./app/components/rsur/particips/particips.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/particips/particips.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [rsur_particip_service_1.RsurParticipService,
        account_service_1.AccountService])
], RsurParticipsComponent);
exports.RsurParticipsComponent = RsurParticipsComponent;
;
//# sourceMappingURL=particips.component.js.map