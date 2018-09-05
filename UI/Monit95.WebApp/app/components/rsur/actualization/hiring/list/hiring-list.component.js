"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
// Services
var rsur_particip_service_1 = require("../../../../../services/rsur-particip.service");
var account_service_1 = require("../../../../../services/account.service");
var HiringListComponent = /** @class */ (function () {
    function HiringListComponent(rsurParticipService, accauntService, snackBar, dialog) {
        this.rsurParticipService = rsurParticipService;
        this.accauntService = accauntService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.allParticips = [];
        this.actualParticips = [];
        this.displayedColumns = ['Code', 'Surname', 'Name', 'SecondName', 'RsurSubjectName'];
        this.dataSource = new material_1.MatTableDataSource();
        this.isLoading = true;
    }
    HiringListComponent.prototype.ngOnInit = function () {
        this.getParticips();
    };
    HiringListComponent.prototype.getParticips = function () {
        var _this = this;
        this.rsurParticipService.getAll()
            .subscribe(function (response) {
            _this.allParticips = response;
            _this.actualParticips = _this.allParticips.filter(function (f) { return f.ActualCode === 1; });
            _this.dataSource = new material_1.MatTableDataSource(_this.actualParticips);
            _this.isLoading = false;
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
    };
    HiringListComponent.prototype.applyFilter = function () {
        this.dataSource.filter = this.filterText.trim().toLowerCase();
    };
    HiringListComponent.prototype.focusFilterInput = function () {
        // на случай если используется кастомный предикат, заменяем его предикатом по умолчанию
        this.dataSource.filterPredicate = defaultFilterPredicate;
    };
    tslib_1.__decorate([
        core_1.ViewChild(material_1.MatSort),
        tslib_1.__metadata("design:type", material_1.MatSort)
    ], HiringListComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        core_1.ViewChild(material_1.MatPaginator),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], HiringListComponent.prototype, "paginator", void 0);
    HiringListComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'rsur/particips',
            templateUrl: "./app/components/rsur/actualization/hiring/list/hiring-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/actualization/hiring/list/hiring-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_particip_service_1.RsurParticipService,
            account_service_1.AccountService,
            material_1.MatSnackBar,
            material_1.MatDialog])
    ], HiringListComponent);
    return HiringListComponent;
}());
exports.HiringListComponent = HiringListComponent;
;
function defaultFilterPredicate(data, filter) {
    if (!filter || filter === '')
        return true;
    return data.Code.toString().indexOf(filter) > -1
        || data.SchoolParticipInfo.Surname.toLowerCase().indexOf(filter) > -1
        || data.SchoolParticipInfo.Name.toLowerCase().indexOf(filter) > -1
        || data.SchoolParticipInfo.SchoolName.toLowerCase().indexOf(filter) > -1
        || data.RsurSubjectName.toLowerCase().indexOf(filter) > -1;
}
//# sourceMappingURL=hiring-list.component.js.map