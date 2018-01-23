import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ParticipsListComponent } from './particips-list.component';
import { ParticipService } from '../services/particip.service';

const routes: Routes = [
	{ path: '', redirectTo: '/list', pathMatch: 'full' },
	{ path: 'list', component: ParticipsListComponent }
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	],
	declarations: [
		ParticipsListComponent
	],
	providers: [
		ParticipService
	]
})
export class ParticipsModule { }