﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarksProtocolComponent } from '../components/rsur/protocols/shared/marks-protocol.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { LoadingViewComponent } from './loading-view/loading-view.component';
import { TablePaginator } from './table-paginator/table-paginator';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MaterialModule
	],
	declarations: [
		MarksProtocolComponent,
		LoadingViewComponent,
		TablePaginator
	],
	exports: [
		MarksProtocolComponent,
		LoadingViewComponent,
		TablePaginator
	]
})
export class SharedModule { }