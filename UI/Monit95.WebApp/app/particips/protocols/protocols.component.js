"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var particip_protocols_service_1 = require("../../services/particip-protocols.service");
var material_1 = require("@angular/material");
var PROJECT_TEST_ID = 1;
var ProtocolsComponent = /** @class */ (function () {
    function ProtocolsComponent(participProtocolsService, router) {
        var _this = this;
        this.participProtocolsService = participProtocolsService;
        this.router = router;
        this.displayedColumns = ['index', 'FIO', 'Marks', 'actions'];
        this.AbsentText = 'отсутствовал';
        this.dataSource = new material_1.MatTableDataSource();
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
        this.participProtocolsService.getProtocolsList().subscribe(function (res) {
            _this.protocols = res;
            _this.protocolsCount = res.length;
            _this.dataSource = new material_1.MatTableDataSource(res);
            _this.isLoading = false;
            _this.dataSource.paginator = _this.paginator;
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
        this.participProtocolsService.markAsAbsent(protocol.ParticipTestId).subscribe(function (_) {
            //protocol.QuestionMarks = this.AbsentText;
            _this.getProtocols();
        });
    };
    tslib_1.__decorate([
        core_1.ViewChild(material_1.MatPaginator),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], ProtocolsComponent.prototype, "paginator", void 0);
    ProtocolsComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/protocols/protocols.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/particips/protocols/protocols.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particip_protocols_service_1.ParticipProtocolsService,
            router_1.Router])
    ], ProtocolsComponent);
    return ProtocolsComponent;
}());
exports.ProtocolsComponent = ProtocolsComponent;
//# sourceMappingURL=protocols.component.js.map