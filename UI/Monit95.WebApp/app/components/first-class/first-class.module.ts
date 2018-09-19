import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParticipsListComponent } from './particips/list/particips-list.component';
import { AddOrUpdateComponent } from './particips/add-or-update/add-or-update.component';
import { SharedModule } from '../../shared/shared-module';
import { MaterialModule } from '../../material.module';
import { ParticipService } from '../../services/first-class/particips.service';
import { ProtocolsService } from '../../services/first-class/protocols.service';
import { ProtocolsListComponent } from './protocols/list/protocols-list.component';
import { ProtocolComponent } from './protocols/protocol/protocol.component';

const routes: Routes = [
	{ path: 'first-class/home', component: HomeComponent },
	//{ path: 'first-class/particips/list', component: ParticipsListComponent },
	//{ path: 'first-class/particips/add', component: AddOrUpdateComponent },
	//{ path: 'first-class/particips/:participId', component: AddOrUpdateComponent },

	{ path: 'first-class/protocols/list', component: ProtocolsListComponent },
	{ path: 'first-class/protocol/:participTestId', component: ProtocolComponent },

	{ path: 'first-class', redirectTo: 'first-class/home', pathMatch: 'full' }
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
	exports: [RouterModule],
	declarations: [
		HomeComponent,
		ParticipsListComponent,
		AddOrUpdateComponent,
		ProtocolsListComponent,
		ProtocolComponent
	],
	providers: [
		ParticipService,
		ProtocolsService
	]
})
export class FirstClassModule { }