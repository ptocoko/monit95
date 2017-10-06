﻿// Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { MdButtonModule, MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppComponent } from './app.component';
import { ParticipModalComponent } from './rsur/details/particip-modal.component';
import { ResultsModalComponent } from './rsur/results/results-modal.component';
import { RsurHomeComponent } from './rsur/rsur-home/rsur-home.component';
import { RsurExamsComponent } from './rsur/rsur-exams/rsur-exams.component';
import { RsurParticipsComponent } from './rsur/rsur-particips/rsur-particips.component';
import { RsurParticipAddFormComponent } from './rsur/rsurparticip-add-form/rsurparticip-add-form.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './rsur/details/particip-details.component';
import { ParticipCorrectionComponent } from './rsur/correction/particip-correction.component';
import { ExportExcelModal } from './class-particips/excel-export/export-excel-modal.component';
import { ClassParticipsListComponent } from './class-particips/class-particips-list.component';
import { ClassParticipMarksComponent } from './class-particips/marks/marks.component';
import { ClassParticipsExportExcelComponent } from "./class-particips/excel-export/export-excel.component";
import { ClassParticipsPlanComponent } from "./class-particips/class-particips-plan.component";
import { AddClassParticipComponent } from "./class-particips/add-and-update/add.component";
import { UpdateClassParticipComponent } from "./class-particips/add-and-update/update.component";
import { MarksAddAndEditComponent } from "./class-particips/marks/marks-add-and-edit.component";
import { ClassParticipReportComponent } from "./class-particips/results/particip-report.component";


// Services
import { AccountService } from './account/account.service';
import { ParticipService } from './particip.service';
import { RsurParticipService } from './rsur/rsurparticip.service';
import { SchoolService } from './school.service';
import { ParticipCorrectionService } from './rsur/correction/particip-correction.service';
import { ClassService } from './class.service';
import { MarksService } from './rsur/marks/marks.service';
import { SchoolCollectorService } from "./shared/school-collector.service";
import { ResultsService } from "./shared/results.service";

// Pipes
import { RsurParticipFilterPipe } from './rsur/rsurparticip-filter.pipe';
import { LimitToPipe } from './limit-to.pipe';
import { ParticipsWithoutDetailsPipe } from './rsur/details/particips-without-details.filter';
import { ParticipFilterPipe } from './particip-filter.pipe';
import { SchoolFilter } from './school-filter.pipe';
import { ClassNameFilterPipe } from "./shared/class-name-filter.pipe";

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
		BrowserAnimationsModule,
		MdButtonModule,
        MdDialogModule,
        NgbModule.forRoot()
    ],

	declarations: [
        AppComponent,
        RsurHomeComponent,
	    RsurExamsComponent,
        RsurParticipsComponent,	
        RsurParticipAddFormComponent,
		RsurParticipFilterPipe,
		ParticipFilterPipe,
		ClassNameFilterPipe,
		LimitToPipe,
        ParticipsWithoutDetailsPipe,
        SchoolFilter,        
		PlanComponent,
		ResultComponent,
		ParticipDetailsComponent,		
		ParticipModalComponent,
		ResultsModalComponent,        
        ParticipCorrectionComponent,		
		ClassParticipsListComponent,
		ExportExcelModal,
		ClassParticipMarksComponent,
		ClassParticipsExportExcelComponent,
		ClassParticipsPlanComponent,
		AddClassParticipComponent,
		UpdateClassParticipComponent,
		MarksAddAndEditComponent,
		ClassParticipReportComponent
	],
	providers: [
        AccountService,
        RsurParticipService,
        SchoolService,
        ParticipCorrectionService,
        ClassService,
        ParticipService,
		MarksService,
		SchoolCollectorService,
		ResultsService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler }
	],  
	entryComponents: [
		ParticipModalComponent,
		ResultsModalComponent,				
		ExportExcelModal
	],
    bootstrap: [AppComponent]
})
export class AppModule { }