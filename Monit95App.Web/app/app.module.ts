// Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
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
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './rsur/details/particip-details.component';
import { ParticipCorrectionComponent } from './rsur/correction/particip-correction.component';
import { AddClassParticipModal } from './class-particips/add-class-particip.modal';
import { ExportExcelModal } from './class-particips/excel-export/export-excel-modal.component';
import { ClassParticipsListComponent } from './class-particips/class-particips-list.component';
import { ClassParticipMarksComponent } from './class-particips/marks/marks.component';
import { ClassParticipsExportExcelComponent } from "./class-particips/excel-export/export-excel.component";

// Services
import { AccountService } from './account/account.service';
import { ParticipService } from './particip.service';
import { RsurParticipService } from './rsur/rsurparticip.service';
import { ParticipCorrectionService } from './rsur/correction/particip-correction.service';
import { ClassService } from './class.service';
import { MarksService } from './rsur/marks/marks.service';

// Pipes
import { RsurParticipFilterPipe } from './rsur/rsurparticip-filter.pipe';
import { LimitToPipe } from './limit-to.pipe';
import { ParticipsWithoutDetailsPipe } from './rsur/details/particips-without-details.filter';
import { ParticipFilterPipe } from './particip-filter.pipe';

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
        ModalModule.forRoot(),
        BootstrapModalModule,
        MyDatePickerModule,
        MdDialogModule,
        MdButtonModule
    ],

	declarations: [
		AppComponent,
		RsurParticipComponent,		
		RsurParticipFilterPipe,
		ParticipFilterPipe,
		LimitToPipe,
		ParticipsWithoutDetailsPipe,
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
		ClassParticipsExportExcelComponent
	],
	providers: [
        AccountService, RsurParticipService, ParticipCorrectionService, ClassService, ParticipService, MarksService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler }
	],  
	entryComponents: [
		ParticipModalComponent,
		ResultsModalComponent,				
		ExportExcelModal,
		AddClassParticipModal
	],
    bootstrap: [AppComponent]
})
export class AppModule { }