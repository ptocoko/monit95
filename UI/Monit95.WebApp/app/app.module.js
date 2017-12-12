"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// Modules
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var mydatepicker_1 = require("mydatepicker");
var animations_1 = require("@angular/platform-browser/animations");
var http_2 = require("@angular/common/http");
var router_1 = require("@angular/router");
var ngx_order_pipe_1 = require("ngx-order-pipe");
var material_module_1 = require("./material.module");
// Components
var app_component_1 = require("./components/app/app.component");
var particips_component_1 = require("./components/rsur/particips/particips.component");
var rsurparticip_add_form_component_1 = require("./rsur/rsurparticip-add-form/rsurparticip-add-form.component");
var plan_component_1 = require("./plan/plan.component");
var result_component_1 = require("./result/result.component");
var particip_correction_component_1 = require("./rsur/correction/particip-correction.component");
var class_particips_list_component_1 = require("./class-particips/class-particips-list.component");
var marks_component_1 = require("./class-particips/marks/marks.component");
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
var matching_protocol_component_1 = require("./components/rsur/protocols/matching/matching-protocol.component");
var scan_protocols_component_1 = require("./components/rsur/protocols/scan/scan-protocols.component");
var question_protocols_list_component_1 = require("./components/rsur/protocols/question/question-protocols-list.component");
var marks_protocol_component_1 = require("./components/rsur/protocols/shared/marks-protocol.component");
var question_protocol_component_1 = require("./components/rsur/protocols/protocol/question-protocol.component");
// Services
var account_service_1 = require("./services/account.service");
var particip_service_1 = require("./particip.service");
var rsur_particip_service_1 = require("./services/rsur-particip.service");
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
var rsur_protocols_service_1 = require("./services/rsur-protocols.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
// Pipes
var limit_to_pipe_1 = require("./limit-to.pipe");
var particips_without_details_filter_1 = require("./rsur/details/particips-without-details.filter");
var particip_filter_pipe_1 = require("./particip-filter.pipe");
var school_filter_pipe_1 = require("./school-filter.pipe");
var class_name_filter_pipe_1 = require("./shared/class-name-filter.pipe");
var rsur_report_filter_pipe_1 = require("./pipes/rsur-report-filter.pipe");
var subject_filter_pipe_1 = require("./components/rsur/ratings/subject-filter.pipe");
var rsur_particip_filter_pipe_1 = require("./pipes/rsur-particip-filter.pipe");
var rsur_protocol_filter_pipe_1 = require("./pipes/rsur-protocol-filter.pipe");
// Additional 
var common_1 = require("@angular/common");
var error_handler_1 = require("./error-handler");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                mydatepicker_1.MyDatePickerModule,
                animations_1.BrowserAnimationsModule,
                ngx_order_pipe_1.OrderModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                material_module_1.MaterialModule,
                router_1.RouterModule.forRoot([
                    { path: 'rsur', component: home_component_1.HomeComponent },
                    { path: 'rsur/test', component: rsur_test_component_1.RsurTestComponent },
                    { path: 'rsur/particips', component: particips_component_1.RsurParticipsComponent },
                    { path: 'rsur/particips/add', component: rsurparticip_add_form_component_1.RsurParticipAddFormComponent },
                    { path: 'rsur/tests/:id/protocols', component: rsur_test_protocol_list_component_1.RsurTestProtocolListComponent },
                    { path: 'rsur/testprotocols/:id', component: rsur_test_protocol_component_1.RsurTestProtocolComponent },
                    { path: 'rsur/seminar-reports', component: seminar_report_list_component_1.SeminarReportsListComponent },
                    { path: 'rsur/seminar-reports/:id', component: seminar_report_component_1.SeminarReportComponent },
                    { path: 'rsur/upload-report', component: create_form_component_1.CreateReportFormComponent },
                    { path: 'rsur/report/:id', component: report_component_1.ReportComponent },
                    { path: 'rsur/results-list', component: report_list_component_1.ReportListComponent },
                    { path: 'rsur/ratings', component: ratings_component_1.RatingsComponent },
                    { path: 'rsur/match-protocol/:id', component: matching_protocol_component_1.MatchingProtocolComponent },
                    { path: 'rsur/scan-protocols', component: scan_protocols_component_1.ScanProtocolsComponent },
                    { path: 'rsur/question-protocols', component: question_protocols_list_component_1.QuestionProtocolsList },
                    { path: 'rsur/question-protocol/:participCode', component: question_protocol_component_1.QuestionProtocolComponent },
                    { path: 'school-files', component: school_files_component_1.SchoolFilesComponent },
                    { path: 'plan', component: plan_component_1.PlanComponent },
                    { path: 'result', component: result_component_1.ResultComponent },
                    { path: 'particip-correction', component: particip_correction_component_1.ParticipCorrectionComponent },
                    { path: 'class-particips', component: class_particips_plan_component_1.ClassParticipsPlanComponent },
                    { path: 'class-particips/list', component: class_particips_list_component_1.ClassParticipsListComponent },
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
                particips_component_1.RsurParticipsComponent,
                rsurparticip_add_form_component_1.RsurParticipAddFormComponent,
                rsur_particip_filter_pipe_1.RsurParticipFilterPipe,
                particip_filter_pipe_1.ParticipFilterPipe,
                class_name_filter_pipe_1.ClassNameFilterPipe,
                limit_to_pipe_1.LimitToPipe,
                particips_without_details_filter_1.ParticipsWithoutDetailsPipe,
                rsur_report_filter_pipe_1.TestIdPipe,
                scan_protocols_component_1.FilterPipe,
                school_filter_pipe_1.SchoolFilter,
                rsur_protocol_filter_pipe_1.RsurProtocolFilter,
                rsur_report_filter_pipe_1.SchoolNameFilterPipe,
                rsur_report_filter_pipe_1.TestNameWithDateFilterPipe,
                rsur_report_filter_pipe_1.TotalFilterPipe,
                subject_filter_pipe_1.SubjectFilterPipe,
                rsur_particip_filter_pipe_1.RsurParticipActualFilterPipe,
                plan_component_1.PlanComponent,
                result_component_1.ResultComponent,
                particip_correction_component_1.ParticipCorrectionComponent,
                class_particips_list_component_1.ClassParticipsListComponent,
                marks_component_1.ClassParticipMarksComponent,
                class_particips_plan_component_1.ClassParticipsPlanComponent,
                add_component_1.AddClassParticipComponent,
                update_component_1.UpdateClassParticipComponent,
                marks_add_and_edit_component_1.MarksAddAndEditComponent,
                rsur_test_protocol_list_component_1.RsurTestProtocolListComponent,
                rsur_test_protocol_component_1.RsurTestProtocolComponent,
                report_component_1.ReportComponent,
                report_list_component_1.ReportListComponent,
                create_form_component_1.CreateReportFormComponent,
                ratings_component_1.RatingsComponent,
                seminar_report_list_component_1.SeminarReportsListComponent,
                seminar_report_component_1.SeminarReportComponent,
                school_files_component_1.SchoolFilesComponent,
                matching_protocol_component_1.MatchingProtocolComponent,
                scan_protocols_component_1.ScanProtocolsComponent,
                question_protocols_list_component_1.QuestionProtocolsList,
                marks_protocol_component_1.MarksProtocolComponent,
                question_protocol_component_1.QuestionProtocolComponent
            ],
            providers: [
                account_service_1.AccountService,
                rsur_particip_service_1.RsurParticipService,
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
                rsur_protocols_service_1.RsurProtocolsService,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                { provide: core_1.ErrorHandler, useClass: error_handler_1.GlobalErrorHandler }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map