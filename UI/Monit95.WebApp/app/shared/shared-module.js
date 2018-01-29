"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var marks_protocol_component_1 = require("../components/rsur/protocols/shared/marks-protocol.component");
var forms_1 = require("@angular/forms");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            declarations: [
                marks_protocol_component_1.MarksProtocolComponent
            ],
            exports: [
                marks_protocol_component_1.MarksProtocolComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared-module.js.map