"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var marks_protocol_component_1 = require("../components/rsur/protocols/shared/marks-protocol.component");
var forms_1 = require("@angular/forms");
var material_module_1 = require("../material.module");
var loading_view_component_1 = require("./loading-view/loading-view.component");
var table_paginator_1 = require("./table-paginator/table-paginator");
var limit_to_pipe_1 = require("../pipes/limit-to.pipe");
var offset_pipe_1 = require("../pipes/offset.pipe");
var confirm_dialog_component_1 = require("./confirm-dialog/confirm-dialog.component");
var particips_pipe_1 = require("../pipes/one-two-three/particips.pipe");
var mark_validate_directive_1 = require("./mark-validate.directive");
var uploader_component_1 = require("../components/two-three/excel-uploader/uploader.component");
var stacked_bar_component_1 = require("./stacked-bar/stacked-bar.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        (0, core_1.NgModule)({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_module_1.MaterialModule
            ],
            declarations: [
                marks_protocol_component_1.MarksProtocolComponent,
                loading_view_component_1.LoadingViewComponent,
                table_paginator_1.TablePaginator,
                limit_to_pipe_1.LimitToPipe,
                offset_pipe_1.OffsetPipe,
                confirm_dialog_component_1.ConfirmDialogComponent,
                particips_pipe_1.ClassFilterPipe,
                particips_pipe_1.ClassesGetterPipe,
                particips_pipe_1.ParticipFilterPipe,
                mark_validate_directive_1.MarkValidateDirective,
                uploader_component_1.ExcelUploadComponent,
                stacked_bar_component_1.StackedBarComponent
            ],
            exports: [
                marks_protocol_component_1.MarksProtocolComponent,
                loading_view_component_1.LoadingViewComponent,
                table_paginator_1.TablePaginator,
                limit_to_pipe_1.LimitToPipe,
                offset_pipe_1.OffsetPipe,
                confirm_dialog_component_1.ConfirmDialogComponent,
                particips_pipe_1.ClassFilterPipe,
                particips_pipe_1.ClassesGetterPipe,
                particips_pipe_1.ParticipFilterPipe,
                mark_validate_directive_1.MarkValidateDirective,
                uploader_component_1.ExcelUploadComponent,
                stacked_bar_component_1.StackedBarComponent
            ],
            entryComponents: [confirm_dialog_component_1.ConfirmDialogComponent]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared-module.js.map