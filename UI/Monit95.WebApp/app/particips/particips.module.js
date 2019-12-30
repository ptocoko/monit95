var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParticipsListComponent } from './list/particips-list.component';
import { ParticipService } from '../services/particip.service';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParticipFilterPipe } from '../pipes/particip-filter.pipe';
import { MaterialModule } from '../material.module';
import { ProtocolsComponent } from './protocols/protocols.component';
import { AddParticipComponent } from './add-and-update/add.component';
import { ParticipProtocolsService } from '../services/particip-protocols.service';
import { ParticipProtocolComponent } from './protocols/protocol/protocol.component';
import { SharedModule } from '../shared/shared-module';
import { ListComponent } from './shared/list/list.component';
import { OgeHomeComponent } from './oge/home/home.component';
import { OgeParticipsListComponent } from './oge/list/particips-list.component';
import { SocietyHomeComponent } from './society/home/home.component';
import { SocietyParticipsListComponent } from './society/list/particips-list.component';
import { ReportsListComponent } from './reports/list/list.component';
import { ReportsService } from '../services/iTakeEge/reports/reports.service';
import { ReportComponent } from './reports/report/report.component';
import { SchoolsReportsListComponent } from './reports2/schools-list/schools-reports-list.component';
import { SchoolReportComponent } from './reports2/school/school-report.component';
import { Reports2Service } from '../services/iTakeEge/reports2/reports2.service';
var ɵ0 = { projectId: 27, projectName: 'EГЭ' }, ɵ1 = { projectId: 28, projectName: 'ОГЭ' };
var routes = [
    { path: 'particips/home', component: HomeComponent },
    { path: 'particips/list', component: ParticipsListComponent },
    { path: 'particips/new', component: AddParticipComponent, data: ɵ0 },
    { path: 'particips/protocols/:id', component: ProtocolsComponent },
    { path: 'particips/protocol/:id', component: ParticipProtocolComponent },
    { path: 'particips/reports/:projectId', component: ReportsListComponent },
    { path: 'particips/report/:participTestId', component: ReportComponent },
    { path: 'particips/reports2/:projectTestId', component: SchoolsReportsListComponent },
    { path: 'particips/oge/home', component: OgeHomeComponent },
    { path: 'particips/oge', redirectTo: 'particips/oge/home', pathMatch: 'full' },
    { path: 'particips/oge/list', component: OgeParticipsListComponent },
    { path: 'particips/oge/new', component: AddParticipComponent, data: ɵ1 },
    { path: 'particips/society', component: SocietyHomeComponent },
    { path: 'particips/society/list', component: SocietyParticipsListComponent },
    //{ path: 'particips/society/new', component: AddParticipComponent, data: { projectId: 27, projectName: 'Обществознание' } },
    //{ path: 'particips/put-protocol/:id', component: ParticipProtocolComponent, data: { restMethod: 'PUT' } },
    { path: 'particips', redirectTo: 'particips/home', pathMatch: 'full' },
];
var ParticipsModule = /** @class */ (function () {
    function ParticipsModule() {
    }
    ParticipsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule,
                MaterialModule,
                RouterModule.forChild(routes)
            ],
            exports: [
                RouterModule
            ],
            declarations: [
                HomeComponent,
                ParticipsListComponent,
                ParticipFilterPipe,
                AddParticipComponent,
                ProtocolsComponent,
                ParticipProtocolComponent,
                ListComponent,
                OgeHomeComponent,
                OgeParticipsListComponent,
                SocietyHomeComponent,
                SocietyParticipsListComponent,
                ReportsListComponent,
                ReportComponent,
                SchoolsReportsListComponent,
                SchoolReportComponent
            ],
            providers: [
                ParticipService,
                ParticipProtocolsService,
                ReportsService,
                Reports2Service
            ]
        })
    ], ParticipsModule);
    return ParticipsModule;
}());
export { ParticipsModule };
export { ɵ0, ɵ1 };
//# sourceMappingURL=particips.module.js.map