var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { ParticipService } from '../../../services/particip.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SchoolCollectorService } from '../../../shared/school-collector.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
var PROJECT_ID = 33;
var COLLECTOR_ID = 121;
var SocietyParticipsListComponent = /** @class */ (function () {
    function SocietyParticipsListComponent(participService, dialog, collectorService) {
        this.participService = participService;
        this.dialog = dialog;
        this.collectorService = collectorService;
        this.particips = [];
        this.displayedColumns = ['select', 'num', 'fio', 'status', 'prevYearGrade', 'bookAuthor'];
        this.dataSource = new MatTableDataSource(this.particips);
        this.selection = new SelectionModel(true, []);
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
        var dialogRef = this.dialog.open(ConfirmDialogComponent, {
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
    __decorate([
        ViewChild(MatPaginator),
        __metadata("design:type", MatPaginator)
    ], SocietyParticipsListComponent.prototype, "paginator", void 0);
    SocietyParticipsListComponent = __decorate([
        Component({
            templateUrl: './particips-list.component.html',
            styleUrls: ['./particips-list.component.css']
        }),
        __metadata("design:paramtypes", [ParticipService,
            MatDialog,
            SchoolCollectorService])
    ], SocietyParticipsListComponent);
    return SocietyParticipsListComponent;
}());
export { SocietyParticipsListComponent };
//# sourceMappingURL=particips-list.component.js.map