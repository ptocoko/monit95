"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmModalComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var ConfirmModalComponent = /** @class */ (function () {
    function ConfirmModalComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ConfirmModalComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/vpr/confirm-modal/confirm-modal.component.html?v=".concat(new Date().getTime()),
            //styleUrls: [`./app/components/vpr/confirm-modal/confirm-modal.component.css?v=${new Date().getTime()}`],
        }),
        tslib_1.__param(1, (0, core_1.Inject)(material_1.MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], ConfirmModalComponent);
    return ConfirmModalComponent;
}());
exports.ConfirmModalComponent = ConfirmModalComponent;
//# sourceMappingURL=confirm-modal.component.js.map