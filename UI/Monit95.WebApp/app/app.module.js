"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// Modules
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var mydatepicker_1 = require("mydatepicker");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var ngx_order_pipe_1 = require("ngx-order-pipe");
var material_module_1 = require("./material.module");
var particips_module_1 = require("./particips/particips.module");
var one_two_three_module_1 = require("./one-two-three/one-two-three.module");
var shared_module_1 = require("./shared/shared-module");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var first_class_module_1 = require("./components/first-class/first-class.module");
// Components
var app_component_1 = require("./components/app/app.component");
var particips_component_1 = require("./components/rsur/particips/particips.component");
//import { RsurParticipAddFormComponent } from './rsur/rsurparticip-add-form/rsurparticip-add-form.component';
//import { PlanComponent } from './plan/plan.component';
//import { ResultComponent } from './result/result.component';
//import { ParticipCorrectionComponent } from './rsur/correction/particip-correction.component';
//import { RsurTestProtocolListComponent } from './rsur/rsur-test-protocol/rsur-test-protocol-list.component';
//import { RsurTestProtocolComponent } from './rsur/rsur-test-protocol/rsur-test-protocol.component';
//import { RsurTestComponent } from './rsur/rsur-test/rsur-test.component';
var home_component_1 = require("./components/rsur/home/home.component");
var report_component_1 = require("./components/rsur/reports/report/report.component");
var report_list_component_1 = require("./components/rsur/reports/report-list/report-list.component");
var ratings_component_1 = require("./components/rsur/ratings/ratings.component");
var create_form_component_1 = require("./components/rsur/seminar-reports/create-form/create-form.component");
var seminar_report_list_component_1 = require("./components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component");
var seminar_report_component_1 = require("./components/rsur/seminar-reports/seminar-report/seminar-report.component");
var school_files_component_1 = require("./components/school-files/school-files.component");
//import { MatchingProtocolComponent } from './components/rsur/protocols/matching/matching-protocol.component';
//import { ScanProtocolsComponent, FilterPipe } from './components/rsur/protocols/scan/scan-protocols.component';
var question_protocols_list_component_1 = require("./components/rsur/protocols/question/question-protocols-list.component");
var question_protocol_component_1 = require("./components/rsur/protocols/protocol/question-protocol.component");
var firing_list_component_1 = require("./components/rsur/actualization/firing/list/firing-list.component");
// Services
var account_service_1 = require("./services/account.service");
var rsur_particip_service_1 = require("./services/rsur-particip.service");
//import { RsurTestService } from './rsur/rsur-test/rsur-test.service';
//import { SchoolService } from './school.service';
//import { ParticipCorrectionService } from './rsur/correction/particip-correction.service';
var class_service_1 = require("./services/class.service");
//import { MarksService } from './rsur/rsur-test-protocol/marks.service';
//import { SchoolCollectorService } from './shared/school-collector.service';
//import { ResultsService } from './shared/results.service';
var rsur_report_service_1 = require("./services/rsur-report.service");
var rsur_rating_service_1 = require("./services/rsur-rating.service");
var seminar_report_service_1 = require("./services/seminar-report.service");
var school_file_service_1 = require("./services/school-file.service");
var rsur_protocols_service_1 = require("./services/rsur-protocols.service");
var actualization_service_1 = require("./services/rsur/actualization.service");
// Pipes
//import { LimitToPipe } from './limit-to.pipe';
var particips_without_details_filter_1 = require("./rsur/details/particips-without-details.filter");
//import { ParticipFilterPipe } from './pipes/particip-filter.pipe';
var school_filter_pipe_1 = require("./school-filter.pipe");
var class_name_filter_pipe_1 = require("./shared/class-name-filter.pipe");
var rsur_report_filter_pipe_1 = require("./pipes/rsur-report-filter.pipe");
var subject_filter_pipe_1 = require("./components/rsur/ratings/subject-filter.pipe");
var rsur_particip_filter_pipe_1 = require("./pipes/rsur-particip-filter.pipe");
var rsur_protocol_filter_pipe_1 = require("./pipes/rsur-protocol-filter.pipe");
//import { OffsetPipe } from './pipes/offset.pipe';
// Additional 
var common_1 = require("@angular/common");
var error_handler_1 = require("./error-handler");
var material_1 = require("@angular/material");
var russian_paginator_provider_1 = require("./shared/russian-paginator.provider");
var custom_route_reuse_strategy_1 = require("./custom-route-reuse-strategy");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                mydatepicker_1.MyDatePickerModule,
                animations_1.BrowserAnimationsModule,
                ngx_order_pipe_1.OrderModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                shared_module_1.SharedModule,
                material_module_1.MaterialModule,
                particips_module_1.ParticipsModule,
                one_two_three_module_1.OneTwoThreeModule,
                first_class_module_1.FirstClassModule,
                router_1.RouterModule.forRoot([
                    { path: 'rsur', component: home_component_1.HomeComponent },
                    //{ path: 'rsur/test', component: RsurTestComponent },
                    { path: 'rsur/particips', component: particips_component_1.RsurParticipsComponent },
                    { path: 'rsur/actualization/firing/list', component: firing_list_component_1.FiringListComponent },
                    //{ path: 'rsur/particips/add', component: RsurParticipAddFormComponent },
                    //            { path: 'rsur/tests/:id/protocols', component: RsurTestProtocolListComponent },
                    //{ path: 'rsur/testprotocols/:id', component: RsurTestProtocolComponent },
                    { path: 'rsur/seminar-reports', component: seminar_report_list_component_1.SeminarReportsListComponent },
                    { path: 'rsur/seminar-reports/create', component: create_form_component_1.SeminarReportCreateFormComponent },
                    { path: 'rsur/seminar-reports/:id', component: seminar_report_component_1.SeminarReportComponent },
                    { path: 'rsur/report/:id', component: report_component_1.ReportComponent },
                    { path: 'rsur/results-list', component: report_list_component_1.ReportListComponent },
                    { path: 'rsur/ratings', component: ratings_component_1.RatingsComponent },
                    //{ path: 'rsur/match-protocol/:id', component: MatchingProtocolComponent },
                    //{ path: 'rsur/scan-protocols', component: ScanProtocolsComponent },
                    { path: 'rsur/question-protocols', component: question_protocols_list_component_1.QuestionProtocolsList },
                    { path: 'rsur/question-protocol/:participCode', component: question_protocol_component_1.QuestionProtocolComponent },
                    { path: 'school-files', component: school_files_component_1.SchoolFilesComponent },
                    //            { path: 'plan', component: PlanComponent },
                    //            { path: 'result', component: ResultComponent },                
                    //{ path: 'particip-correction', component: ParticipCorrectionComponent },
                    { path: '', redirectTo: '/rsur', pathMatch: 'full' }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                //RsurTestComponent,
                particips_component_1.RsurParticipsComponent,
                //RsurParticipAddFormComponent,
                rsur_particip_filter_pipe_1.RsurParticipFilterPipe,
                class_name_filter_pipe_1.ClassNameFilterPipe,
                //LimitToPipe,
                //OffsetPipe,
                particips_without_details_filter_1.ParticipsWithoutDetailsPipe,
                rsur_report_filter_pipe_1.TestIdPipe,
                //FilterPipe,
                school_filter_pipe_1.SchoolFilter,
                rsur_protocol_filter_pipe_1.RsurProtocolFilter,
                rsur_report_filter_pipe_1.SchoolNameFilterPipe,
                rsur_report_filter_pipe_1.TestNameWithDateFilterPipe,
                rsur_report_filter_pipe_1.TotalFilterPipe,
                subject_filter_pipe_1.SubjectFilterPipe,
                rsur_particip_filter_pipe_1.RsurParticipActualFilterPipe,
                rsur_report_filter_pipe_1.ExamNameFilterPipe,
                //PlanComponent,
                //ResultComponent,   
                //      ParticipCorrectionComponent,
                //      RsurTestProtocolListComponent,
                //RsurTestProtocolComponent,
                report_component_1.ReportComponent,
                report_list_component_1.ReportListComponent,
                create_form_component_1.SeminarReportCreateFormComponent,
                ratings_component_1.RatingsComponent,
                seminar_report_list_component_1.SeminarReportsListComponent,
                seminar_report_component_1.SeminarReportComponent,
                school_files_component_1.SchoolFilesComponent,
                //MatchingProtocolComponent,
                //ScanProtocolsComponent,
                question_protocols_list_component_1.QuestionProtocolsList,
                //MarksProtocolComponent,
                question_protocol_component_1.QuestionProtocolComponent,
                firing_list_component_1.FiringListComponent
            ],
            providers: [
                account_service_1.AccountService,
                rsur_particip_service_1.RsurParticipService,
                //RsurTestService,
                //   SchoolService,
                //   ParticipCorrectionService,
                class_service_1.ClassService,
                //ParticipService,
                //MarksService,
                //SchoolCollectorService,
                //ResultsService,
                rsur_report_service_1.RsurReportService,
                rsur_rating_service_1.RsurRatingService,
                seminar_report_service_1.SeminarReportService,
                school_file_service_1.SchoolFileService,
                rsur_protocols_service_1.RsurProtocolsService,
                actualization_service_1.ActualizationService,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                { provide: core_1.ErrorHandler, useClass: error_handler_1.GlobalErrorHandler },
                { provide: material_1.MatPaginatorIntl, useClass: russian_paginator_provider_1.RussianMatPaginator },
                { provide: router_1.RouteReuseStrategy, useClass: custom_route_reuse_strategy_1.CustomReuseStrategy }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map