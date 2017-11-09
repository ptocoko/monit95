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
var http_2 = require("@angular/common/http");
var router_1 = require("@angular/router");
var ngx_order_pipe_1 = require("ngx-order-pipe");
// Components
var app_component_1 = require("./app.component");
var particip_modal_component_1 = require("./rsur/details/particip-modal.component");
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
var rsur_test_component_1 = require("./rsur/rsur-test/rsur-test.component");
var home_component_1 = require("./components/rsur/home/home.component");
var report_component_1 = require("./components/rsur/reports/report/report.component");
var report_list_component_1 = require("./components/rsur/reports/report-list/report-list.component");
var create_form_component_1 = require("./components/rsur/seminar-reports/seminar-report/create-form/create-form.component");
var ratings_component_1 = require("./components/rsur/ratings/ratings.component");
var seminar_report_list_component_1 = require("./components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component");
var seminar_report_component_1 = require("./components/rsur/seminar-reports/seminar-report/seminar-report.component");
var school_files_component_1 = require("./components/school-files/school-files.component");
// Services
var account_service_1 = require("./services/account.service");
var particip_service_1 = require("./particip.service");
var rsurparticip_service_1 = require("./rsur/rsurparticip.service");
var rsur_test_service_1 = require("./rsur/rsur-test/rsur-test.service");
var school_service_1 = require("./school.service");
var particip_correction_service_1 = require("./rsur/correction/particip-correction.service");
var class_service_1 = require("./class.service");
var marks_service_1 = require("./rsur/rsur-test-protocol/marks.service");
var school_collector_service_1 = require("./shared/school-collector.service");
var results_service_1 = require("./shared/results.service");
var rsur_report_service_1 = require("./services/rsur-report.service");
var rsur_rating_service_1 = require("./services/rsur-rating.service");
var seminar_report_service_1 = require("./services/seminar-report.service");
var school_file_service_1 = require("./services/school-file.service");
// Pipes
var rsurparticip_filter_pipe_1 = require("./rsur/rsurparticip-filter.pipe");
var limit_to_pipe_1 = require("./limit-to.pipe");
var particips_without_details_filter_1 = require("./rsur/details/particips-without-details.filter");
var particip_filter_pipe_1 = require("./particip-filter.pipe");
var school_filter_pipe_1 = require("./school-filter.pipe");
var class_name_filter_pipe_1 = require("./shared/class-name-filter.pipe");
var report_filter_pipe_1 = require("./components/rsur/reports/report-list/report-filter.pipe");
var subject_filter_pipe_1 = require("./components/rsur/ratings/subject-filter.pipe");
// Additional 
var common_1 = require("@angular/common");
var error_handler_1 = require("./error-handler");
//import SeminarReportComponent = Seminarreportcomponent.SeminarReportComponent;
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
            http_2.HttpClientModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            angular2_modal_1.ModalModule.forRoot(),
            bootstrap_1.BootstrapModalModule,
            mydatepicker_1.MyDatePickerModule,
            animations_1.BrowserAnimationsModule,
            material_1.MatButtonModule,
            material_1.MatDialogModule,
            ngx_order_pipe_1.OrderModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            router_1.RouterModule.forRoot([
                { path: 'rsur', component: home_component_1.HomeComponent },
                { path: 'rsur/test', component: rsur_test_component_1.RsurTestComponent },
                { path: 'rsur/particips', component: rsur_particips_component_1.RsurParticipsComponent },
                { path: 'rsur/particips/add', component: rsurparticip_add_form_component_1.RsurParticipAddFormComponent },
                { path: 'rsur/tests/:id/protocols', component: rsur_test_protocol_list_component_1.RsurTestProtocolListComponent },
                { path: 'rsur/testprotocols/:id', component: rsur_test_protocol_component_1.RsurTestProtocolComponent },
                { path: 'rsur/seminar-reports', component: seminar_report_list_component_1.SeminarReportListComponent },
                { path: 'rsur/seminar-reports/:id', component: seminar_report_component_1.SeminarReportComponent },
                { path: 'rsur/upload-report', component: create_form_component_1.UploadReportComponent },
                { path: 'rsur/report/:id', component: report_component_1.ReportComponent },
                { path: 'rsur/results-list', component: report_list_component_1.ReportListComponent },
                { path: 'rsur/ratings', component: ratings_component_1.RatingsComponent },
                { path: 'school-files', component: school_files_component_1.SchoolFilesComponent },
                { path: 'plan', component: plan_component_1.PlanComponent },
                { path: 'result', component: result_component_1.ResultComponent },
                { path: 'details', component: particip_details_component_1.ParticipDetailsComponent },
                { path: 'particip-correction', component: particip_correction_component_1.ParticipCorrectionComponent },
                { path: 'class-particips', component: class_particips_plan_component_1.ClassParticipsPlanComponent },
                { path: 'class-particips/list', component: class_particips_list_component_1.ClassParticipsListComponent },
                { path: 'class-particips/upload-excel', component: export_excel_component_1.ClassParticipsExportExcelComponent },
                { path: 'class-particips/new', component: add_component_1.AddClassParticipComponent },
                { path: 'class-particips/update/:id', component: update_component_1.UpdateClassParticipComponent },
                { path: 'class-particips/marks', component: marks_component_1.ClassParticipMarksComponent },
                { path: 'class-particips/marks-edit/:participTestId', component: marks_add_and_edit_component_1.MarksAddAndEditComponent },
                { path: '', redirectTo: '/rsur', pathMatch: 'full' }
            ])
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            rsur_test_component_1.RsurTestComponent,
            rsur_particips_component_1.RsurParticipsComponent,
            rsurparticip_add_form_component_1.RsurParticipAddFormComponent,
            report_filter_pipe_1.RsurParticipFilterPipe,
            rsurparticip_filter_pipe_1.RsurShowNotActualParticips,
            particip_filter_pipe_1.ParticipFilterPipe,
            class_name_filter_pipe_1.ClassNameFilterPipe,
            limit_to_pipe_1.LimitToPipe,
            particips_without_details_filter_1.ParticipsWithoutDetailsPipe,
            report_filter_pipe_1.TestIdPipe,
            school_filter_pipe_1.SchoolFilter,
            report_filter_pipe_1.SchoolNameFilterPipe,
            report_filter_pipe_1.TestNameWithDateFilterPipe,
            report_filter_pipe_1.TotalFilterPipe,
            subject_filter_pipe_1.SubjectFilterPipe,
            plan_component_1.PlanComponent,
            result_component_1.ResultComponent,
            particip_details_component_1.ParticipDetailsComponent,
            particip_modal_component_1.ParticipModalComponent,
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
            rsur_test_protocol_component_1.RsurTestProtocolComponent,
            report_component_1.ReportComponent,
            report_list_component_1.ReportListComponent,
            create_form_component_1.UploadReportComponent,
            ratings_component_1.RatingsComponent,
            seminar_report_list_component_1.SeminarReportListComponent,
            seminar_report_component_1.SeminarReportComponent,
            school_files_component_1.SchoolFilesComponent
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
            rsur_report_service_1.RsurReportService,
            rsur_rating_service_1.RsurRatingService,
            seminar_report_service_1.SeminarReportService,
            school_file_service_1.SchoolFileService,
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            { provide: core_1.ErrorHandler, useClass: error_handler_1.GlobalErrorHandler }
        ],
        entryComponents: [
            particip_modal_component_1.ParticipModalComponent,
            export_excel_modal_component_1.ExportExcelModal
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map