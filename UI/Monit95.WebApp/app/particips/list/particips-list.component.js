"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var particip_service_1 = require("../../services/particip.service");
var material_1 = require("@angular/material");
var PROJECT_ID = 1; // "i pass ege" projectId
var ParticipsListComponent = /** @class */ (function () {
    function ParticipsListComponent(participService, router) {
        this.participService = participService;
        this.router = router;
        this.displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'ClassName', 'Birthday', 'upd-action', 'del-action'];
        this.dataSource = new material_1.MatTableDataSource();
    }
    ParticipsListComponent.prototype.ngOnInit = function () {
        this.getParticips();
    };
    ParticipsListComponent.prototype.getParticips = function () {
        var _this = this;
        this.isLoading = true;
        this.participService.getAll(PROJECT_ID).subscribe(function (res) {
            _this.participsCount = res.length;
            _this.dataSource = new material_1.MatTableDataSource(res);
            _this.isLoading = false;
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
    };
    ParticipsListComponent.prototype.applyFilter = function (filterValue) {
        this.paginator.pageIndex = 0;
        filterValue = filterValue.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    };
    tslib_1.__decorate([
        core_1.ViewChild(material_1.MatSort),
        tslib_1.__metadata("design:type", material_1.MatSort)
    ], ParticipsListComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        core_1.ViewChild(material_1.MatPaginator),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], ParticipsListComponent.prototype, "paginator", void 0);
    ParticipsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/list/particips-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/particips/list/particips-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particip_service_1.ParticipService,
            router_1.Router])
    ], ParticipsListComponent);
    return ParticipsListComponent;
}());
exports.ParticipsListComponent = ParticipsListComponent;
//# sourceMappingURL=particips-list.component.js.map