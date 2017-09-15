// Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { MdDialogModule, MdButtonModule } from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { ParticipModalComponent } from './rsur/details/particip-modal.component';
import { ResultsModalComponent } from './rsur/results/results-modal.component';
import { RsurParticipComponent } from './rsur/rsurparticip.component';
import { RsurParticipAddFormComponent } from './rsur/rsurparticip-add-form/rsurparticip-add-form.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './rsur/details/particip-details.component';
import { ParticipCorrectionComponent } from './rsur/correction/particip-correction.component';
import { AddClassParticipModal } from './class-particips/add-class-particip.modal';
import { ExportExcelModal } from './class-particips/excel-export/export-excel-modal.component';
import { ClassParticipsListComponent } from './class-particips/class-particips-list.component';
import { ClassParticipMarksComponent } from './class-particips/marks/marks.component';
import { ClassParticipsExportExcelComponent } from "./class-particips/excel-export/export-excel.component";
import { ClassParticipMarksEditModal } from "./class-particips/marks/marks-edit.modal";

// Services
import { AccountService } from './account/account.service';
import { ParticipService } from './particip.service';
import { RsurParticipService } from './rsur/rsurparticip.service';
import { SchoolService } from './school.service';
import { ParticipCorrectionService } from './rsur/correction/particip-correction.service';
import { ClassService } from './class.service';
import { MarksService } from './rsur/marks/marks.service';

// Pipes
import { RsurParticipFilterPipe } from './rsur/rsurparticip-filter.pipe';
import { LimitToPipe } from './limit-to.pipe';
import { ParticipsWithoutDetailsPipe } from './rsur/details/particips-without-details.filter';
import { ParticipFilterPipe } from './particip-filter.pipe';
import { UniqFilter } from './rsur/rsurparticip-add-form/uniqfilter.pipe';

// Additional 
import { routing } from './app.routing';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GlobalErrorHandler } from './error-handler';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        MyDatePickerModule,
        MdDialogModule,
        MdButtonModule
    ],

	declarations: [
		AppComponent,
        RsurParticipComponent,	
        RsurParticipAddFormComponent,
		RsurParticipFilterPipe,
		ParticipFilterPipe,
		LimitToPipe,
        ParticipsWithoutDetailsPipe,
        UniqFilter,
		PlanComponent,
		ResultComponent,
		ParticipDetailsComponent,		
		ParticipModalComponent,
		ResultsModalComponent,        
        ParticipCorrectionComponent,		
		ClassParticipsListComponent,
		ExportExcelModal,
		AddClassParticipModal,
		ClassParticipMarksComponent,
		ClassParticipsExportExcelComponent,
		ClassParticipMarksEditModal
	],
	providers: [
        AccountService,
        RsurParticipService,
        SchoolService,
        ParticipCorrectionService,
        ClassService,
        ParticipService,
        MarksService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler }
	],  
	entryComponents: [
		ParticipModalComponent,
		ResultsModalComponent,				
		ExportExcelModal,
		AddClassParticipModal,
		ClassParticipMarksEditModal
	],
    bootstrap: [AppComponent]
})
export class AppModule { }