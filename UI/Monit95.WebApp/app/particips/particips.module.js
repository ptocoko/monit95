"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var particips_list_component_1 = require("./list/particips-list.component");
var particip_service_1 = require("../services/particip.service");
var home_component_1 = require("./home/home.component");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var particip_filter_pipe_1 = require("../pipes/particip-filter.pipe");
var material_module_1 = require("../material.module");
var protocols_component_1 = require("./protocols/protocols.component");
var add_component_1 = require("./add-and-update/add.component");
var particip_protocols_service_1 = require("../services/particip-protocols.service");
var protocol_component_1 = require("./protocols/protocol/protocol.component");
var shared_module_1 = require("../shared/shared-module");
var list_component_1 = require("./shared/list/list.component");
var home_component_2 = require("./oge/home/home.component");
var particips_list_component_2 = require("./oge/list/particips-list.component");
var home_component_3 = require("./society/home/home.component");
var particips_list_component_3 = require("./society/list/particips-list.component");
var list_component_2 = require("./reports/list/list.component");
var reports_service_1 = require("../services/iTakeEge/reports/reports.service");
var report_component_1 = require("./reports/report/report.component");
var routes = [
    { path: 'particips/home', component: home_component_1.HomeComponent },
    { path: 'particips/list', component: particips_list_component_1.ParticipsListComponent },
    { path: 'particips/new', component: add_component_1.AddParticipComponent },
    { path: 'particips/protocols/:id', component: protocols_component_1.ProtocolsComponent },
    { path: 'particips/protocol/:id', component: protocol_component_1.ParticipProtocolComponent },
    { path: 'particips/reports/:projectId', component: list_component_2.ReportsListComponent },
    { path: 'particips/report/:participTestId', component: report_component_1.ReportComponent },
    //{ path: 'particips/oge/home', component: OgeHomeComponent },
    //{ path: 'particips/oge', redirectTo: 'particips/oge/home', pathMatch: 'full' },
    //{ path: 'particips/oge/list', component: OgeParticipsListComponent},
    //{ path: 'particips/oge/new', component: AddParticipComponent, data: { projectId: 19, projectName: 'Я сдам ОГЭ!' } },
    //{ path: 'particips/society', component: SocietyHomeComponent },
    //{ path: 'particips/society/list', component: SocietyParticipsListComponent },
    //{ path: 'particips/society/new', component: AddParticipComponent, data: { projectId: 20, projectName: 'Обществознание' } },
    //{ path: 'particips/put-protocol/:id', component: ParticipProtocolComponent, data: { restMethod: 'PUT' } },
    { path: 'particips', redirectTo: 'particips/home', pathMatch: 'full' },
];
var ParticipsModule = /** @class */ (function () {
    function ParticipsModule() {
    }
    ParticipsModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                material_module_1.MaterialModule,
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: [
                home_component_1.HomeComponent,
                particips_list_component_1.ParticipsListComponent,
                particip_filter_pipe_1.ParticipFilterPipe,
                add_component_1.AddParticipComponent,
                protocols_component_1.ProtocolsComponent,
                protocol_component_1.ParticipProtocolComponent,
                list_component_1.ListComponent,
                home_component_2.OgeHomeComponent,
                particips_list_component_2.OgeParticipsListComponent,
                home_component_3.SocietyHomeComponent,
                particips_list_component_3.SocietyParticipsListComponent,
                list_component_2.ReportsListComponent,
                report_component_1.ReportComponent
            ],
            providers: [
                particip_service_1.ParticipService,
                particip_protocols_service_1.ParticipProtocolsService,
                reports_service_1.ReportsService
            ]
        })
    ], ParticipsModule);
    return ParticipsModule;
}());
exports.ParticipsModule = ParticipsModule;
//# sourceMappingURL=particips.module.js.map