"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolsComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var particip_protocols_service_1 = require("../../services/particip-protocols.service");
var material_1 = require("@angular/material");
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
        this.dataSource = new material_1.MatTableDataSource();
        this.protocols = [];
        this.isLoading = true;
        // вычисление статистики
        this.processedProtocols = function () { return _this.protocols.filter(function (f) { return f.QuestionMarks; }).length; };
        this.notProcessedProtocols = function () { return _this.protocols.filter(function (f) { return !f.QuestionMarks; }).length; };
    }
    ProtocolsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.hasOptionNumber = queryParams.has('hasOptionNumber');
        });
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
                if (res.every(function (r) { return !r.DocumNumber; })) {
                    _this.displayedColumns = _this.displayedColumns.filter(function (dc) { return dc !== 'DocumNumber'; });
                }
                _this.dataSource = new material_1.MatTableDataSource(res);
                _this.isLoading = false;
                _this.dataSource.paginator = _this.paginator;
            });
        });
    };
    ProtocolsComponent.prototype.changeMarks = function (participTestId) {
        var opt = {};
        if (this.hasOptionNumber) {
            opt.queryParams = {
                'hasOptionNumber': 'true'
            };
        }
        this.router.navigate(['/particips/protocol', participTestId], opt);
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
    tslib_1.__decorate([
        (0, core_1.ViewChild)('paginator'),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], ProtocolsComponent.prototype, "paginator", void 0);
    ProtocolsComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/particips/protocols/protocols.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/particips/protocols/protocols.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [particip_protocols_service_1.ParticipProtocolsService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], ProtocolsComponent);
    return ProtocolsComponent;
}());
exports.ProtocolsComponent = ProtocolsComponent;
//# sourceMappingURL=protocols.component.js.map