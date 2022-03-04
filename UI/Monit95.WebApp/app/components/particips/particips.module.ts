import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared-module';

import { ParticipsService } from '../../services/refactored/particips.service';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';

const PROJECT_ID = 35;
const PROJECT_NAME = 'Я сдам EГЭ!'
const data = { projectId: PROJECT_ID, projectName: PROJECT_NAME };

const routes: Routes = [
	{ path: 'particips2/home', component: HomeComponent },
	{ path: 'particips2/list', component: ListComponent },
	{ path: 'particips2/new', component: AddComponent },
	
	//{ path: 'particips2', redirectTo: 'particips/home', pathMatch: 'full' },
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
		ListComponent,
		AddComponent,
		HomeComponent
	],
	providers: [
		ParticipsService
	]
})
export class ParticipsModule2 { }