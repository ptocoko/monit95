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

const routes: Routes = [
	{ path: 'particips/home', component: HomeComponent },
	{ path: 'particips/list', component: ParticipsListComponent },
	{ path: 'particips/new', component: AddParticipComponent },
	{ path: 'particips/protocols', component: ProtocolsComponent },
	{ path: 'particips/protocol/:id', component: ParticipProtocolComponent },
	{ path: 'particips/put-protocol/:id', component: ParticipProtocolComponent, data: { restMethod: 'PUT' } },
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
		
	],
	providers: [
		ParticipService,
		ParticipProtocolsService
	]
})
export class ParticipsModule { }