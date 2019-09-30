"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var particip_service_1 = require("../../../services/particip.service");
var collections_1 = require("@angular/cdk/collections");
var material_1 = require("@angular/material");
var school_collector_service_1 = require("../../../shared/school-collector.service");
var confirm_dialog_component_1 = require("../../../shared/confirm-dialog/confirm-dialog.component");
var PROJECT_ID = 27;
var COLLECTOR_ID = 50;
var SocietyParticipsListComponent = /** @class */ (function () {
    function SocietyParticipsListComponent(participService, dialog, collectorService) {
        this.participService = participService;
        this.dialog = dialog;
        this.collectorService = collectorService;
        this.particips = [];
        this.displayedColumns = ['select', 'num', 'fio', 'status', 'prevYearGrade', 'bookAuthor'];
        this.dataSource = new material_1.MatTableDataSource(this.particips);
        this.selection = new collections_1.SelectionModel(true, []);
        this.isFinished = false;
    }
    SocietyParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.collectorService.getCollectorState(COLLECTOR_ID).subscribe(function (collectorState) {
            _this.isFinished = collectorState.IsFinished;
        });
        this.dataSource.filterPredicate = function (particip, searchText) {
            return particip.Surname.toLowerCase().includes(searchText) ||
                particip.Name.toLowerCase().includes(searchText);
        };
        this.participService.getByProjectId(PROJECT_ID)
            .subscribe(function (res) {
            var _a;
            _this.dataSource.data = res;
            _this.dataSource.paginator = _this.paginator;
            (_a = _this.selection).select.apply(_a, res.filter(function (p) { return p.ActualCode12 === 1; }));
        });
    };
    SocietyParticipsListComponent.prototype.applyFilter = function (filterValue) {
        if (filterValue !== null || filterValue !== undefined) {
            // во время поиска сбрасываем paginator на первую страницу
            this.paginator.pageIndex = 0;
            filterValue = filterValue.trim().toLowerCase();
            this.dataSource.filter = filterValue;
        }
    };
    SocietyParticipsListComponent.prototype.changeSelection = function (row, index) {
        var _this = this;
        this.selection.toggle(row);
        if (row.ActualCode12 === 1) {
            row.ActualCode12 = null;
        }
        else {
            row.ActualCode12 = 1;
        }
        this.participService.putParticip(row, row.Id)
            .subscribe(function () { }, function (error) {
            row.ActualCode12 = null;
            _this.selection.toggle(row);
            throw error;
        });
    };
    SocietyParticipsListComponent.prototype.updateParticip = function (particip) {
        this.participService.putParticip(particip, particip.Id).subscribe();
    };
    /** The label for the checkbox on the passed row */
    SocietyParticipsListComponent.prototype.checkboxLabel = function (row, index) {
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (index + 1);
    };
    SocietyParticipsListComponent.prototype.finish = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440\u043A\u0443 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438?" }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.collectorService.isFinished(COLLECTOR_ID, true).subscribe(function () {
                    _this.isFinished = true;
                });
            }
        });
    };
    SocietyParticipsListComponent.prototype.notFinished = function () {
        var _this = this;
        this.collectorService.isFinished(COLLECTOR_ID, false).subscribe(function () {
            _this.isFinished = false;
        });
    };
    tslib_1.__decorate([
        core_1.ViewChild(material_1.MatPaginator),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], SocietyParticipsListComponent.prototype, "paginator", void 0);
    SocietyParticipsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/society/list/particips-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/particips/society/list/particips-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particip_service_1.ParticipService,
            material_1.MatDialog,
            school_collector_service_1.SchoolCollectorService])
    ], SocietyParticipsListComponent);
    return SocietyParticipsListComponent;
}());
exports.SocietyParticipsListComponent = SocietyParticipsListComponent;
//# sourceMappingURL=particips-list.component.js.map