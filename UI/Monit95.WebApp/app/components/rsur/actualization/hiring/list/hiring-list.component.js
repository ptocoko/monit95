"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("../../../../../shared/confirm-dialog/confirm-dialog.component");
// Services
var rsur_particip_service_1 = require("../../../../../services/rsur-particip.service");
var account_service_1 = require("../../../../../services/account.service");
var school_collector_service_1 = require("../../../../../shared/school-collector.service");
var COLLECTOR_ID = 4;
var HiringListComponent = /** @class */ (function () {
    function HiringListComponent(rsurParticipService, accauntService, snackBar, dialog, collectorService) {
        this.rsurParticipService = rsurParticipService;
        this.accauntService = accauntService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.collectorService = collectorService;
        this.particips = [];
        this.isLoading = true;
        this.isFinished = false;
    }
    HiringListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.collectorService.getSchoolCollectorState(COLLECTOR_ID).subscribe(function (state) {
            _this.isFinished = state.IsFinished;
            if (!_this.isFinished) {
                _this.getParticips();
            }
        });
    };
    HiringListComponent.prototype.getParticips = function () {
        var _this = this;
        this.rsurParticipService.getAll()
            .subscribe(function (response) {
            _this.particips = response.filter(function (f) { return f.ActualCode === 1 || f.ActualCode === 3 || f.ActualCode === 4; });
            _this.isLoading = false;
        });
    };
    HiringListComponent.prototype.cancelHiring = function (particip) {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 '" + particip.SchoolParticipInfo.Surname + " " + particip.SchoolParticipInfo.Name + " " + particip.SchoolParticipInfo.SecondName + "'? \u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                if (particip.ActualCode === 3) {
                    var part = {
                        ActualCode: 2,
                        SchoolId: particip.SchoolIdFrom
                    };
                    _this.rsurParticipService.update(particip.Code, part).subscribe(function () { return _this.deleteItem(particip.Code); });
                }
                else if (particip.ActualCode === 4) {
                    _this.rsurParticipService.delete(particip.Code).subscribe(function () { return _this.deleteItem(particip.Code); });
                }
            }
        });
    };
    HiringListComponent.prototype.finish = function () {
        var _this = this;
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u044D\u0442\u0430\u043F 2?" }
        });
        dialogRef.afterClosed().subscribe(function (res) {
            if (res) {
                _this.collectorService.isFinished(COLLECTOR_ID, true).subscribe(function () { return _this.isFinished = true; });
            }
        });
    };
    HiringListComponent.prototype.notFinish = function () {
        var _this = this;
        this.collectorService.isFinished(COLLECTOR_ID, false).subscribe(function () { return _this.isFinished = false; });
        this.ngOnInit();
    };
    HiringListComponent.prototype.deleteItem = function (itemCode) {
        var partIndex = this.particips.findIndex(function (p) { return p.Code === itemCode; });
        this.particips.splice(partIndex, 1);
    };
    HiringListComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'rsur/particips',
            templateUrl: "./app/components/rsur/actualization/hiring/list/hiring-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/actualization/hiring/list/hiring-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_particip_service_1.RsurParticipService,
            account_service_1.AccountService,
            material_1.MatSnackBar,
            material_1.MatDialog,
            school_collector_service_1.SchoolCollectorService])
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