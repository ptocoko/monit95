"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var mydatepicker_1 = require("mydatepicker");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
// Components
var app_component_1 = require("./app.component");
var particip_modal_component_1 = require("./rsur/details/particip-modal.component");
var results_modal_component_1 = require("./rsur/results/results-modal.component");
var rsur_home_component_1 = require("./rsur/rsur-home/rsur-home.component");
var rsur_test_component_1 = require("./rsur/rsur-test/rsur-test.component");
var rsur_particips_component_1 = require("./rsur/rsur-particips/rsur-particips.component");
var rsurparticip_add_form_component_1 = require("./rsur/rsurparticip-add-form/rsurparticip-add-form.component");
var plan_component_1 = require("./plan/plan.component");
var result_component_1 = require("./result/result.component");
var particip_details_component_1 = require("./rsur/details/particip-details.component");
var particip_correction_component_1 = require("./rsur/correction/particip-correction.component");
var export_excel_modal_component_1 = require("./class-particips/excel-export/export-excel-modal.component");
var class_particips_list_component_1 = require("./class-particips/class-particips-list.component");
var marks_component_1 = require("./class-particips/marks/marks.component");
var export_excel_component_1 = require("./class-particips/excel-export/export-excel.component");
var class_particips_plan_component_1 = require("./class-particips/class-particips-plan.component");
var add_component_1 = require("./class-particips/add-and-update/add.component");
var update_component_1 = require("./class-particips/add-and-update/update.component");
var marks_add_and_edit_component_1 = require("./class-particips/marks/marks-add-and-edit.component");
var rsur_test_protocol_list_component_1 = require("./rsur/rsur-test-protocol/rsur-test-protocol-list.component");
var rsur_test_protocol_component_1 = require("./rsur/rsur-test-protocol/rsur-test-protocol.component");
// Services
var account_service_1 = require("./account/account.service");
var particip_service_1 = require("./particip.service");
var rsurparticip_service_1 = require("./rsur/rsurparticip.service");
var rsur_test_service_1 = require("./rsur/rsur-test/rsur-test.service");
var school_service_1 = require("./school.service");
var particip_correction_service_1 = require("./rsur/correction/particip-correction.service");
var class_service_1 = require("./class.service");
var marks_service_1 = require("./rsur/rsur-test-protocol/marks.service");
var school_collector_service_1 = require("./shared/school-collector.service");
var results_service_1 = require("./shared/results.service");
// Pipes
var rsurparticip_filter_pipe_1 = require("./rsur/rsurparticip-filter.pipe");
var limit_to_pipe_1 = require("./limit-to.pipe");
var particips_without_details_filter_1 = require("./rsur/details/particips-without-details.filter");
var particip_filter_pipe_1 = require("./particip-filter.pipe");
var school_filter_pipe_1 = require("./school-filter.pipe");
var class_name_filter_pipe_1 = require("./shared/class-name-filter.pipe");
// Additional 
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
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            app_routing_1.routing,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            angular2_modal_1.ModalModule.forRoot(),
            bootstrap_1.BootstrapModalModule,
            mydatepicker_1.MyDatePickerModule,
            animations_1.BrowserAnimationsModule,
            material_1.MatButtonModule,
            material_1.MatDialogModule,
            ng_bootstrap_1.NgbModule.forRoot()
        ],
        declarations: [
            app_component_1.AppComponent,
            rsur_home_component_1.RsurHomeComponent,
            rsur_test_component_1.RsurTestComponent,
            rsur_particips_component_1.RsurParticipsComponent,
            rsurparticip_add_form_component_1.RsurParticipAddFormComponent,
            rsurparticip_filter_pipe_1.RsurParticipFilterPipe,
            rsurparticip_filter_pipe_1.RsurShowNotActualParticips,
            particip_filter_pipe_1.ParticipFilterPipe,
            class_name_filter_pipe_1.ClassNameFilterPipe,
            limit_to_pipe_1.LimitToPipe,
            particips_without_details_filter_1.ParticipsWithoutDetailsPipe,
            school_filter_pipe_1.SchoolFilter,
            plan_component_1.PlanComponent,
            result_component_1.ResultComponent,
            particip_details_component_1.ParticipDetailsComponent,
            particip_modal_component_1.ParticipModalComponent,
            results_modal_component_1.ResultsModalComponent,
            particip_correction_component_1.ParticipCorrectionComponent,
            class_particips_list_component_1.ClassParticipsListComponent,
            export_excel_modal_component_1.ExportExcelModal,
            marks_component_1.ClassParticipMarksComponent,
            export_excel_component_1.ClassParticipsExportExcelComponent,
            class_particips_plan_component_1.ClassParticipsPlanComponent,
            add_component_1.AddClassParticipComponent,
            update_component_1.UpdateClassParticipComponent,
            marks_add_and_edit_component_1.MarksAddAndEditComponent,
            rsur_test_protocol_list_component_1.RsurTestProtocolListComponent,
            rsur_test_protocol_component_1.RsurTestProtocolComponent
        ],
        providers: [
            account_service_1.AccountService,
            rsurparticip_service_1.RsurParticipService,
            rsur_test_service_1.RsurTestService,
            school_service_1.SchoolService,
            particip_correction_service_1.ParticipCorrectionService,
            class_service_1.ClassService,
            particip_service_1.ParticipService,
            marks_service_1.MarksService,
            school_collector_service_1.SchoolCollectorService,
            results_service_1.ResultsService,
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            { provide: core_1.ErrorHandler, useClass: error_handler_1.GlobalErrorHandler }
        ],
        entryComponents: [
            particip_modal_component_1.ParticipModalComponent,
            results_modal_component_1.ResultsModalComponent,
            export_excel_modal_component_1.ExportExcelModal
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map