import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared-module';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: 'one-two-three/home', component: HomeComponent },
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
		HomeComponent
	]
})
export class OneTwoThreeModule { }