"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var particip_service_1 = require("../../services/particip.service");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../../shared/confirm-dialog/confirm-dialog.component");
var ParticipsListComponent = /** @class */ (function () {
    function ParticipsListComponent(participService, router, modal, snackBar) {
        this.participService = participService;
        this.router = router;
        this.modal = modal;
        this.snackBar = snackBar;
        this.displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'DocumNumber', 'SourceName', 'del-action'];
        this.dataSource = new material_1.MatTableDataSource();
    }
    ParticipsListComponent.prototype.ngOnInit = function () {
        this.getParticips();
    };
    ParticipsListComponent.prototype.getParticips = function () {
        var _this = this;
        this.isLoading = true;
        this.participService.getAll().subscribe(function (res) {
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
    ParticipsListComponent.prototype.addClassParticip = function () {
        this.router.navigate(['/particips/new']);
    };
    //updateClassParticip(classParticip: ParticipModel) {
    //	this.router.navigate(['/update', classParticip.Id]);
    //}
    ParticipsListComponent.prototype.deleteClassParticip = function (particip) {
        var _this = this;
        var modalRef = this.modal.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u043C\u0435\u0441\u0442\u0435 \u0441 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u043C \u0431\u0443\u0434\u0443\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u044B \u0438 \u0432\u0441\u0435 \u0435\u0433\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B!" }
        });
        modalRef.afterClosed().subscribe(function (isDelete) {
            if (isDelete) {
                _this.participService.deleteParticip(particip.Id)
                    .subscribe(function (res) {
                    _this.getParticips();
                    _this.snackBar.open('участник удален!', 'OK', { duration: 3000 });
                });
            }
        });
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
            router_1.Router,
            material_1.MatDialog,
            material_1.MatSnackBar])
    ], ParticipsListComponent);
    return ParticipsListComponent;
}());
exports.ParticipsListComponent = ParticipsListComponent;
//# sourceMappingURL=particips-list.component.js.map