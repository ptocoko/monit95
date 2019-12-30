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
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ParticipsService } from '../../../services/refactored/particips.service';
var ListComponent = /** @class */ (function () {
    function ListComponent(router, route, modal, snackBar, participsService) {
        this.router = router;
        this.route = route;
        this.modal = modal;
        this.snackBar = snackBar;
        this.participsService = participsService;
        this.particips = [];
        this.displayedColumns = ['$id', 'Surname', 'Name', 'SecondName', 'ClassName', 'del-action'];
        this.dataSource = new MatTableDataSource();
    }
    ListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.projectId = this.route.snapshot.queryParams['projectId'];
        //this.route.queryParams.subscribe(queryParams => {
        //	this.projectName = queryParams['projectName'];
        //});
        this.participsService.getAll(this.projectId).subscribe(function (particips) {
            _this.dataSource = new MatTableDataSource(particips);
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
        var modalRef = this.modal.open(ConfirmDialogComponent, {
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
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        }),
        __metadata("design:paramtypes", [Router,
            ActivatedRoute,
            MatDialog,
            MatSnackBar,
            ParticipsService])
    ], ListComponent);
    return ListComponent;
}());
export { ListComponent };
//# sourceMappingURL=list.component.js.map