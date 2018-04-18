import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared-module';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParticipsListComponent } from './particips/list/particips-list.component';
import { ParticipService } from '../services/one-two-three/particips.service';
import { ClassFilterPipe, ClassesGetterPipe, ParticipFilterPipe } from '../pipes/one-two-three/particips.pipe';

const routes: Routes = [
	{ path: 'one-two-three/home', component: HomeComponent },
	{ path: 'one-two-three/particips/list', component: ParticipsListComponent },
	{ path: 'one-two-three', redirectTo: 'one-two-three/home', pathMatch: 'full' }
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
		ClassFilterPipe,
		ClassesGetterPipe,
		ParticipFilterPipe
	],
	providers: [
		ParticipService
	]
})
export class OneTwoThreeModule { }