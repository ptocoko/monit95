"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsurParticipsComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../../../shared/confirm-dialog/confirm-dialog.component");
// Services
var rsur_particip_service_1 = require("../../../services/rsur-particip.service");
var account_service_1 = require("../../../services/account.service");
var RsurParticipsComponent = /** @class */ (function () {
    function RsurParticipsComponent(rsurParticipService, accauntService, snackBar, dialog) {
        this.rsurParticipService = rsurParticipService;
        this.accauntService = accauntService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.allParticips = [];
        this.actualParticips = [];
        this.isShowNotActual = true;
        this.displayedColumns = ['Code', 'Surname', 'Name', 'SecondName', 'RsurSubjectName', 'SchoolIdWithName'];
        this.dataSource = new material_1.MatTableDataSource();
        this.isLoading = true;
        this.selectedSchool = '';
    }
    RsurParticipsComponent.prototype.ngOnInit = function () {
        if (this.accauntService.isCoko()) {
            this.displayedColumns.push('FiringBtn');
        }
        this.getParticips();
    };
    RsurParticipsComponent.prototype.getParticips = function () {
        var _this = this;
        this.rsurParticipService.getAll()
            .subscribe(function (response) {
            _this.allParticips = response;
            _this.actualParticips = _this.allParticips.filter(function (f) { return f.ActualCode === 1; });
            if (_this.isShowNotActual) {
                _this.dataSource = new material_1.MatTableDataSource(_this.allParticips);
            }
            else {
                _this.dataSource = new material_1.MatTableDataSource(_this.actualParticips);
            }
            _this.isLoading = false;
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
    };
    RsurParticipsComponent.prototype.fireParticip = function (slideToggle, particip) {
        var _this = this;
        // checked == false означает, что участник исключен из проекта
        if (!slideToggle.checked) {
            // если участник исключается вызываем модальное окно для подтверждения
            var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
                width: '400px',
                disableClose: true,
                data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '".concat(particip.SchoolParticipInfo.Surname, " ").concat(particip.SchoolParticipInfo.Name, " ").concat(particip.SchoolParticipInfo.SecondName, "' \u0438\u0437 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0420\u0421\u0423\u0420?") }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result) {
                    particip.ActualCode = 0;
                    _this.rsurParticipService.update(particip.Code, particip)
                        .subscribe(function () {
                        _this.snackBar.open('участник исключен из проекта', 'OK', { duration: 3000 });
                    });
                }
                else {
                    // если пользователь не уверен
                    slideToggle.source.checked = true;
                }
            });
        }
        else {
            // если участник возвращается в проект то подтверждение не требуется
            particip.ActualCode = 1;
            this.rsurParticipService.update(particip.Code, particip)
                .subscribe(function () {
                _this.snackBar.open('участник добавлен в проект', 'OK', { duration: 3000 });
            });
        }
    };
    RsurParticipsComponent.prototype.applyFilter = function () {
        this.dataSource.filter = this.filterText.trim().toLowerCase();
    };
    RsurParticipsComponent.prototype.focusFilterInput = function () {
        this.selectedSchool = '';
        this.applySchoolFilter();
        // на случай если используется кастомный предикат, заменяем его предикатом по умолчанию
        this.dataSource.filterPredicate = defaultFilterPredicate;
    };
    RsurParticipsComponent.prototype.applySchoolFilter = function () {
        this.filterText = '';
        this.paginator.pageIndex = 0;
        // используем кастомный предикат для поиска только по школам вместо предиката по умолчанию
        this.dataSource.filterPredicate = filterBySchoolPredicate;
        this.dataSource.filter = this.selectedSchool.toLowerCase();
    };
    tslib_1.__decorate([
        (0, core_1.ViewChild)(material_1.MatSort),
        tslib_1.__metadata("design:type", material_1.MatSort)
    ], RsurParticipsComponent.prototype, "sort", void 0);
    tslib_1.__decorate([
        (0, core_1.ViewChild)(material_1.MatPaginator),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], RsurParticipsComponent.prototype, "paginator", void 0);
    RsurParticipsComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'rsur/particips',
            templateUrl: "./app/components/rsur/particips/particips.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/rsur/particips/particips.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_particip_service_1.RsurParticipService,
            account_service_1.AccountService,
            material_1.MatSnackBar,
            material_1.MatDialog])
    ], RsurParticipsComponent);
    return RsurParticipsComponent;
}());
exports.RsurParticipsComponent = RsurParticipsComponent;
;
function filterBySchoolPredicate(data, filter) {
    if (filter === '')
        return true;
    return data.SchoolParticipInfo.SchoolName.trim().toLowerCase().indexOf(filter) > -1;
}
function defaultFilterPredicate(data, filter) {
    if (!filter || filter === '')
        return true;
    return data.Code.toString().indexOf(filter) > -1
        || data.SchoolParticipInfo.Surname.toLowerCase().indexOf(filter) > -1
        || data.SchoolParticipInfo.Name.toLowerCase().indexOf(filter) > -1
        || data.SchoolParticipInfo.SchoolName.toLowerCase().indexOf(filter) > -1
        || data.RsurSubjectName.toLowerCase().indexOf(filter) > -1;
}
//# sourceMappingURL=particips.component.js.map