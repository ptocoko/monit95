var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
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
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared-module.js.map