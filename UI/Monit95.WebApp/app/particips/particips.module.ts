import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
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
import { MarksProtocolComponent } from '../components/rsur/protocols/shared/marks-protocol.component';
import { SharedModule } from '../shared/shared-module';
import { ListComponent } from './shared/list/list.component';
import { OgeHomeComponent } from './oge/home/home.component';
import { OgeParticipsListComponent } from './oge/list/particips-list.component';
import { SocietyHomeComponent } from './society/home/home.component';
import { SocietyParticipsListComponent } from './society/list/particips-list.component';
import { ReportsListComponent } from './reports/list/list.component';
import { ReportsService } from '../services/iTakeEge/reports/reports.service';
import { ReportComponent } from './reports/report/report.component';

const routes: Routes = [
	{ path: 'particips/home', component: HomeComponent },
	{ path: 'particips/list', component: ParticipsListComponent }, //, data: { projectId: 18, projectName: 'Я сдам EГЭ!' } },
	{ path: 'particips/new', component: AddParticipComponent, data: { projectId: 27, projectName: 'EГЭ' } },
	{ path: 'particips/protocols/:id', component: ProtocolsComponent },
	{ path: 'particips/protocol/:id', component: ParticipProtocolComponent },
	{ path: 'particips/reports/:projectId', component: ReportsListComponent },
	{ path: 'particips/report/:participTestId', component: ReportComponent },

	{ path: 'particips/oge/home', component: OgeHomeComponent },
	{ path: 'particips/oge', redirectTo: 'particips/oge/home', pathMatch: 'full' },
	{ path: 'particips/oge/list', component: OgeParticipsListComponent},
	{ path: 'particips/oge/new', component: AddParticipComponent, data: { projectId: 28, projectName: 'ОГЭ' } },

	{ path: 'particips/society', component: SocietyHomeComponent },
	{ path: 'particips/society/list', component: SocietyParticipsListComponent },
	//{ path: 'particips/society/new', component: AddParticipComponent, data: { projectId: 27, projectName: 'Обществознание' } },

	//{ path: 'particips/put-protocol/:id', component: ParticipProtocolComponent, data: { restMethod: 'PUT' } },
	{ path: 'particips', redirectTo: 'particips/home', pathMatch: 'full' },
]

@NgModule({
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
		ReportComponent
	],
	providers: [
		ParticipService,
		ParticipProtocolsService,
		ReportsService
	]
})
export class ParticipsModule { }