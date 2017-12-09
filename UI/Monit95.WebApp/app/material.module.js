"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// Modules
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                material_1.MatButtonModule,
                material_1.MatDialogModule,
                material_1.MatCardModule,
                material_1.MatTableModule,
                material_1.MatSortModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatInputModule,
                material_1.MatFormFieldModule,
                material_1.MatToolbarModule,
                material_1.MatProgressBarModule
            ],
            exports: [
                material_1.MatButtonModule,
                material_1.MatDialogModule,
                material_1.MatCardModule,
                material_1.MatTableModule,
                material_1.MatSortModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatInputModule,
                material_1.MatFormFieldModule,
                material_1.MatToolbarModule,
                material_1.MatProgressBarModule
            ],
            declarations: [],
            providers: [],
            entryComponents: []
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
//# sourceMappingURL=material.module.js.map