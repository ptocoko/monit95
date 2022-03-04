"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../../../shared/confirm-dialog/confirm-dialog.component");
var particips_service_1 = require("../../../services/refactored/particips.service");
var school_collector_service_1 = require("../../../shared/school-collector.service");
var ListComponent = /** @class */ (function () {
    function ListComponent(router, route, modal, snackBar, participsService, collectorService) {
        this.router = router;
        this.route = route;
        this.modal = modal;
        this.snackBar = snackBar;
        this.participsService = participsService;
        this.collectorService = collectorService;
        this.particips = [];
        this.filteredParticips = [];
        this.isLoading = true;
        this.classes = [];
        this.selectedClass = '';
        this.displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'ClassName', 'del-action'];
        this.dataSource = new material_1.MatTableDataSource();
        this.collectorByPojectId = {
            '39': {
                '8': 125,
                '9': 126
            },
            '41': {
                '6': 130,
                '10': 131
            },
        };
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.isLoading = true;
            _this.projectName = queryParams.get('projectName');
            _this.projectId = +queryParams.get('projectId');
            if (queryParams.has('classNumber')) {
                _this.classNumber = +queryParams.get('classNumber');
            }
            _this.participsService.getAll(_this.projectId).subscribe(function (particips) {
                particips = particips.map(function (p) {
                    p.ClassName = p.ClassName.trim();
                    return p;
                });
                if (_this.classNumber) {
                    particips = particips.filter(function (p) { return p.ClassName.startsWith(_this.classNumber.toString()); });
                }
                _this.dataSource = new material_1.MatTableDataSource(particips);
                _this.particips = particips;
                _this.filteredParticips = [].concat(_this.particips);
                _this.classes = Array.from(new Set(_this.particips.map(function (p) { return p.ClassName; })));
                _this.classes.sort(function (a, b) { return a.localeCompare(b); });
                if (_this.projectId === 39 || _this.projectId === 41) {
                    _this.collectorId = _this.collectorByPojectId[_this.projectId][_this.classNumber];
                }
                else {
                    _this.collectorId = _this.collectorByPojectId[_this.projectId];
                }
                if (_this.collectorId) {
                    _this.collectorService.getCollectorState(_this.collectorId).subscribe(function (state) {
                        _this.isFinished = state.IsFinished;
                        if (state.IsFinished) {
                            _this.displayedColumns = _this.displayedColumns.filter(function (dc) { return dc !== 'del-action'; });
                        }
                        _this.isLoading = false;
                    });
                }
                else {
                    _this.isLoading = false;
                }
            });
        });
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    };
    ListComponent.prototype.addClassParticip = function () {
        this.router.navigate(['/particips2/new'], { queryParams: { 'projectId': this.projectId, 'projectName': this.projectName, classNumber: this.classNumber } });
    };
    ListComponent.prototype.applyFilter = function (filterValue) {
        // во время поиска сбрасываем paginator на первую страницу
        this.paginator.pageIndex = 0;
        filterValue = filterValue.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    };
    ListComponent.prototype.applyClassFilter = function () {
        var _this = this;
        if (this.selectedClass) {
            this.filteredParticips = this.particips.filter(function (p) { return p.ClassName === _this.selectedClass; });
        }
        else {
            this.filteredParticips = [].concat(this.particips);
        }
        this.dataSource = new material_1.MatTableDataSource(this.filteredParticips);
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
    ListComponent.prototype.finish = function () {
        var _this = this;
        this.collectorService.isFinished(this.collectorId, true).subscribe(function () {
            _this.isFinished = true;
            _this.displayedColumns = _this.displayedColumns.filter(function (dc) { return dc !== 'del-action'; });
        });
    };
    ListComponent.prototype.undoFinish = function () {
        var _this = this;
        this.collectorService.isFinished(this.collectorId, false).subscribe(function () {
            _this.isFinished = false;
            _this.displayedColumns.push('del-action');
        });
    };
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
            templateUrl: "./app/components/particips/list/list.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/particips/list/list.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            material_1.MatDialog,
            material_1.MatSnackBar,
            particips_service_1.ParticipsService,
            school_collector_service_1.SchoolCollectorService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map