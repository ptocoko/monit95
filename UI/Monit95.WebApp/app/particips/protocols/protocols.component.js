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
import { Router, ActivatedRoute } from "@angular/router";
import { ParticipProtocolsService } from '../../services/particip-protocols.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
//const PROJECT_TEST_ID: number = 1;
var ProtocolsComponent = /** @class */ (function () {
    function ProtocolsComponent(participProtocolsService, router, route) {
        var _this = this;
        this.participProtocolsService = participProtocolsService;
        this.router = router;
        this.route = route;
        this.displayedColumns = ['index', 'FIO', 'DocumNumber', 'Marks', 'actions'];
        this.protocolsCount = 0;
        this.AbsentText = 'отсутствовал';
        this.dataSource = new MatTableDataSource();
        this.protocols = [];
        this.isLoading = true;
        // вычисление статистики
        this.processedProtocols = function () { return _this.protocols.filter(function (f) { return f.QuestionMarks; }).length; };
        this.notProcessedProtocols = function () { return _this.protocols.filter(function (f) { return !f.QuestionMarks; }).length; };
    }
    ProtocolsComponent.prototype.ngOnInit = function () {
        this.getProtocols();
    };
    ProtocolsComponent.prototype.getProtocols = function () {
        var _this = this;
        this.isLoading = true;
        this.route.params.subscribe(function (params) {
            var projectTestId = Number.parseInt(params['id']);
            _this.participProtocolsService.getProtocolsList(projectTestId).subscribe(function (res) {
                _this.protocolsCount = res.length;
                _this.protocols = res;
                _this.dataSource = new MatTableDataSource(res);
                _this.isLoading = false;
                _this.dataSource.paginator = _this.paginator;
            });
        });
    };
    ProtocolsComponent.prototype.changeMarks = function (participTestId) {
        this.router.navigate(['/particips/protocol', participTestId]);
    };
    ProtocolsComponent.prototype.applyFilter = function (searchText) {
        // во время поиска сбрасываем paginator на первую страницу
        this.paginator.pageIndex = 0;
        searchText = searchText.trim().toLowerCase();
        this.dataSource.filter = searchText;
    };
    ProtocolsComponent.prototype.markAsAbsent = function (protocol) {
        var _this = this;
        var index = this.dataSource.data.indexOf(protocol);
        this.participProtocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(function (_) {
            _this.dataSource.data[index].QuestionMarks = _this.AbsentText;
        });
    };
    __decorate([
        ViewChild('paginator'),
        __metadata("design:type", MatPaginator)
    ], ProtocolsComponent.prototype, "paginator", void 0);
    ProtocolsComponent = __decorate([
        Component({
            templateUrl: './protocols.component.html',
            styleUrls: ['./protocols.component.css']
        }),
        __metadata("design:paramtypes", [ParticipProtocolsService,
            Router,
            ActivatedRoute])
    ], ProtocolsComponent);
    return ProtocolsComponent;
}());
export { ProtocolsComponent };
//# sourceMappingURL=protocols.component.js.map