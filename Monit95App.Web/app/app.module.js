"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Modules
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var mydatepicker_1 = require("mydatepicker");
//Components
var app_component_1 = require("./app.component");
var particip_modal_component_1 = require("./particips/details/particip-modal.component");
var results_modal_component_1 = require("./particips/results/results-modal.component");
var edit_modal_component_1 = require("./particips/edit-particip/edit-modal.component");
var particips_component_1 = require("./particips/particips.component");
var particip_list_component_1 = require("./particips/particip-list.component");
var plan_component_1 = require("./plan/plan.component");
var result_component_1 = require("./result/result.component");
var particip_details_component_1 = require("./particips/details/particip-details.component");
var edit_particip_component_1 = require("./particips/edit-particip/edit-particip.component");
var particip_correction_component_1 = require("./particips/correction/particip-correction.component");
//Services
var user_service_1 = require("./user.service");
var particip_service_1 = require("./particips/particip.service");
var particip_correction_service_1 = require("./particips/correction/particip-correction.service");
//Pipes
var particip_filter_pipe_1 = require("./particips/particip-filter.pipe");
var limit_to_pipe_1 = require("./limit-to.pipe");
var particips_without_details_filter_1 = require("./particips/details/particips-without-details.filter");
var app_routing_1 = require("./app.routing");
var common_1 = require("@angular/common");
var error_handler_1 = require("./error-handler");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routing_1.routing, forms_1.FormsModule, angular2_modal_1.ModalModule.forRoot(), bootstrap_1.BootstrapModalModule, mydatepicker_1.MyDatePickerModule],
        declarations: [
            app_component_1.AppComponent,
            particips_component_1.ParticipsComponent,
            particip_list_component_1.ParticipListComponent,
            particip_filter_pipe_1.ParticipFilterPipe,
            limit_to_pipe_1.LimitToPipe,
            particips_without_details_filter_1.ParticipsWithoutDetailsPipe,
            plan_component_1.PlanComponent,
            result_component_1.ResultComponent,
            particip_details_component_1.ParticipDetailsComponent,
            edit_particip_component_1.EditParticipComponent,
            particip_modal_component_1.ParticipModalComponent,
            results_modal_component_1.ResultsModalComponent,
            edit_modal_component_1.EditModalComponent,
            particip_correction_component_1.ParticipCorrectionComponent
        ],
        providers: [
            user_service_1.UserService, particip_service_1.ParticipService, particip_correction_service_1.ParticipCorrectionService,
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            { provide: core_1.ErrorHandler, useClass: error_handler_1.GlobalErrorHandler }
        ],
        entryComponents: [particip_modal_component_1.ParticipModalComponent, results_modal_component_1.ResultsModalComponent, edit_modal_component_1.EditModalComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map