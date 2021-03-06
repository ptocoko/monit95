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
import { ClassFilterPipe, ClassesGetterPipe, ParticipFilterPipe } from '../pipes/one-two-three/particips.pipe';
import { MarkValidateDirective } from './mark-validate.directive';
import { ExcelUploadComponent } from '../components/two-three/excel-uploader/uploader.component';
import { StackedBarComponent } from './stacked-bar/stacked-bar.component';

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
		ConfirmDialogComponent,
		ClassFilterPipe,
		ClassesGetterPipe,
		ParticipFilterPipe,
		MarkValidateDirective,
		ExcelUploadComponent,
		StackedBarComponent
	],
	exports: [
		MarksProtocolComponent,
		LoadingViewComponent,
		TablePaginator,
		LimitToPipe,
		OffsetPipe,
		ConfirmDialogComponent,
		ClassFilterPipe,
		ClassesGetterPipe,
		ParticipFilterPipe,
		MarkValidateDirective,
		ExcelUploadComponent,
		StackedBarComponent
	],
	entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }