var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ParticipService } from '../../../services/particip.service';
import { SchoolCollectorService } from '../../../shared/school-collector.service';
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
        this.dataSource = new MatTableDataSource();
    }
    ListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dataSource = new MatTableDataSource(this.particips);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if (this.collectorId) {
            this.collectorService.getCollectorState(this.collectorId).subscribe(function (res) { return _this.isFinished = res.IsFinished; });
        }
    };
    ListComponent.prototype.addClassParticip = function () {
        this.router.navigate([this.addParticipRouterLink]);
    };
    ListComponent.prototype.applyFilter = function (filterValue) {
        // во время поиска сбрасываем paginator на первую страницу
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
    //updateClassParticip(classParticip: ParticipModel) {
    //	this.router.navigate(['/update', classParticip.Id]);
    //}
    ListComponent.prototype.deleteClassParticip = function (particip) {
        var _this = this;
        var participIndex = this.particips.indexOf(particip);
        var modalRef = this.modal.open(ConfirmDialogComponent, {
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
                    _this.snackBar.open('участник удален!', 'OK', { duration: 3000 });
                });
            }
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListComponent.prototype, "particips", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListComponent.prototype, "addParticipRouterLink", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ListComponent.prototype, "collectorId", void 0);
    __decorate([
        ViewChild(MatSort),
        __metadata("design:type", MatSort)
    ], ListComponent.prototype, "sort", void 0);
    __decorate([
        ViewChild(MatPaginator),
        __metadata("design:type", MatPaginator)
    ], ListComponent.prototype, "paginator", void 0);
    ListComponent = __decorate([
        Component({
            selector: 'table-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        }),
        __metadata("design:paramtypes", [Router,
            MatDialog,
            MatSnackBar,
            ParticipService,
            SchoolCollectorService])
    ], ListComponent);
    return ListComponent;
}());
export { ListComponent };
//# sourceMappingURL=list.component.js.map