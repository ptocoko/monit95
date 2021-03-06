"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../../../shared/confirm-dialog/confirm-dialog.component");
var particip_service_1 = require("../../../services/particip.service");
var school_collector_service_1 = require("../../../shared/school-collector.service");
var ListComponent = /** @class */ (function () {
    function ListComponent(router, modal, snackBar, participService, collectorService) {
        this.router = router;
        this.modal = modal;
        this.snackBar = snackBar;
        this.participService = participService;
        this.collectorService = collectorService;
        this.displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'SourceName', 'del-action'];
        this.columnsWhenFinished = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'SourceName'];
        this.participsCount = 0;
        this.dataSource = new material_1.MatTableDataSource();
        this.editable = true;
    }
    ListComponent.prototype.ngOnInit = function () {
        if (this.showSocInsteadSource) {
            this.displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'ActualCode12', 'del-action'];
            this.columnsWhenFinished = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'ActualCode12'];
        }
        if (this.matemChoice) {
            this.columnsWhenFinished = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'matemChoice'];
        }
    };
    ListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dataSource = new material_1.MatTableDataSource(this.particips);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if (this.collectorId) {
            this.collectorService.getCollectorState(this.collectorId).subscribe(function (res) { return _this.isFinished = res.IsFinished; });
        }
    };
    Object.defineProperty(ListComponent.prototype, "listEditable", {
        get: function () {
            return !this.isFinished && this.addParticipRouterLink;
        },
        enumerable: false,
        configurable: true
    });
    ListComponent.prototype.addClassParticip = function () {
        this.router.navigate([this.addParticipRouterLink]);
    };
    ListComponent.prototype.applyFilter = function (filterValue) {
        // ???? ?????????? ???????????? ???????????????????? paginator ???? ???????????? ????????????????
        this.paginator.pageIndex = 0;
        filterValue = filterValue.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    };
    ListComponent.prototype.setAsFinished = function () {
        var _this = this;
        this.collectorService.isFinished(this.collectorId, true).subscribe(function (_) { return _this.isFinished = true; });
    };
    ListComponent.prototype.cancelFinish = function () {
        var _this = this;
        this.collectorService.isFinished(this.collectorId, false).subscribe(function () { return _this.isFinished = false; });
    };
    ListComponent.prototype.setMatemBase = function (particip, val) {
        particip.ActualCode22 = val;
        this.participService.putParticip(particip, particip.Id).subscribe(function () { });
    };
    //updateClassParticip(classParticip: ParticipModel) {
    //	this.router.navigate(['/update', classParticip.Id]);
    //}
    ListComponent.prototype.deleteClassParticip = function (particip) {
        var _this = this;
        var participIndex = this.particips.indexOf(particip);
        var modalRef = this.modal.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u043C\u0435\u0441\u0442\u0435 \u0441 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u043C \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B \u0432\u0441\u0435 \u0435\u0433\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B! \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435?" }
        });
        modalRef.afterClosed().subscribe(function (isDelete) {
            if (isDelete) {
                _this.participService.deleteParticip(particip.Id)
                    .subscribe(function () {
                    //this.getParticips();
                    _this.particips.splice(participIndex, 1);
                    _this.dataSource.data = _this.particips;
                    _this.snackBar.open('???????????????? ????????????!', 'OK', { duration: 3000 });
                });
            }
        });
    };
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Array)
    ], ListComponent.prototype, "particips", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", String)
    ], ListComponent.prototype, "addParticipRouterLink", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Number)
    ], ListComponent.prototype, "collectorId", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Boolean)
    ], ListComponent.prototype, "showSocInsteadSource", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Boolean)
    ], ListComponent.prototype, "matemChoice", void 0);
    tslib_1.__decorate([
        (0, core_1.Input)(),
        tslib_1.__metadata("design:type", Object)
    ], ListComponent.prototype, "editable", void 0);
    tslib_1.__decorate([
        (0, core_1.ViewChild)(material_1.MatSort),
        tslib_1.__metadata("design:type", material_1.MatSort)
    ], ListComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        (0, core_1.ViewChild)(material_1.MatPaginator),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], ListComponent.prototype, "paginator", void 0);
    ListComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'table-list',
            templateUrl: "./app/particips/shared/list/list.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/particips/shared/list/list.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.Router,
            material_1.MatDialog,
            material_1.MatSnackBar,
            particip_service_1.ParticipService,
            school_collector_service_1.SchoolCollectorService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map