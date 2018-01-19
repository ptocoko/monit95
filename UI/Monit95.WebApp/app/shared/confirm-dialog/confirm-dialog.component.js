"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var ConfirmDialogComponent = /** @class */ (function () {
    function ConfirmDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ConfirmDialogComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/shared/confirm-dialog/confirm-dialog.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], ConfirmDialogComponent);
    return ConfirmDialogComponent;
}());
exports.ConfirmDialogComponent = ConfirmDialogComponent;
//# sourceMappingURL=confirm-dialog.component.js.map