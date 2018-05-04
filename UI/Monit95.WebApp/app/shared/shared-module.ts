import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarksProtocolComponent } from '../components/rsur/protocols/shared/marks-protocol.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { LoadingViewComponent } from './loading-view/loading-view.component';
import { TablePaginator } from './table-paginator/table-paginator';
import { LimitToPipe } from '../pipes/limit-to.pipe';
import { OffsetPipe } from '../pipes/offset.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MaterialModule
	],
	declarations: [
		MarksProtocolComponent,
		LoadingViewComponent,
		TablePaginator,
		LimitToPipe,
		OffsetPipe,
		ConfirmDialogComponent
	],
	exports: [
		MarksProtocolComponent,
		LoadingViewComponent,
		TablePaginator,
		LimitToPipe,
		OffsetPipe,
		ConfirmDialogComponent
	],
	entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }