"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../../../shared/confirm-dialog/confirm-dialog.component");
var particips_service_1 = require("../../../services/refactored/particips.service");
var ListComponent = /** @class */ (function () {
    function ListComponent(router, route, modal, snackBar, participsService) {
        this.router = router;
        this.route = route;
        this.modal = modal;
        this.snackBar = snackBar;
        this.participsService = participsService;
        this.particips = [];
        this.displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'ClassName', 'del-action'];
        this.dataSource = new material_1.MatTableDataSource();
    }
    ListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.projectId = this.route.snapshot.queryParams['projectId'];
        //this.route.queryParams.subscribe(queryParams => {
        //	this.projectName = queryParams['projectName'];
        //});
        this.participsService.getAll(this.projectId).subscribe(function (particips) {
            _this.dataSource = new material_1.MatTableDataSource(particips);
            _this.particips = particips;
            _this.projectName = _this.route.snapshot.queryParams['projectName'];
        });
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    };
    ListComponent.prototype.addClassParticip = function () {
        this.router.navigate(['/particips2/new'], { queryParams: { 'projectId': this.projectId, 'projectName': this.projectName } });
    };
    ListComponent.prototype.applyFilter = function (filterValue) {
        // во время поиска сбрасываем paginator на первую страницу
        this.paginator.pageIndex = 0;
        filterValue = filterValue.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    };
    ListComponent.prototype.deleteClassParticip = function (particip) {
        var _this = this;
        var participIndex = this.particips.indexOf(particip);
        var modalRef = this.modal.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430?" }
        });
        modalRef.afterClosed().subscribe(function (isDelete) {
            if (isDelete) {
                _this.participsService.delete(particip.Id)
                    .subscribe(function () {
                    //this.getParticips();
                    _this.particips.splice(participIndex, 1);
                    _this.dataSource.data = _this.particips;
                    _this.snackBar.open('участник удален!', 'OK', { duration: 3000 });
                });
            }
        });
    };
    tslib_1.__decorate([
        core_1.ViewChild(material_1.MatSort),
        tslib_1.__metadata("design:type", material_1.MatSort)
    ], ListComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        core_1.ViewChild(material_1.MatPaginator),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], ListComponent.prototype, "paginator", void 0);
    ListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/particips/list/list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/particips/list/list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            material_1.MatDialog,
            material_1.MatSnackBar,
            particips_service_1.ParticipsService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map