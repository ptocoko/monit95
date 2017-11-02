// Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppComponent } from './app.component';
import { ParticipModalComponent } from './rsur/details/particip-modal.component';
import { RsurHomeComponent } from './rsur/rsur-home/rsur-home.component';
import { RsurTestComponent } from './rsur/rsur-test/rsur-test.component';
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
import { ClassParticipsPlanComponent } from './class-particips/class-particips-plan.component';
import { AddClassParticipComponent } from './class-particips/add-and-update/add.component';
import { UpdateClassParticipComponent } from './class-particips/add-and-update/update.component';
import { MarksAddAndEditComponent } from './class-particips/marks/marks-add-and-edit.component';
import { RsurTestProtocolListComponent } from './rsur/rsur-test-protocol/rsur-test-protocol-list.component';
import { RsurTestProtocolComponent } from './rsur/rsur-test-protocol/rsur-test-protocol.component';
import { ReportComponent } from './rsur/reports/report/report.component';
import { ReportListComponent } from './rsur/reports/report-list/report-list.component';

// Services
import { AccountService } from './account/account.service';
import { ParticipService } from './particip.service';
import { RsurParticipService } from './rsur/rsurparticip.service';
import { RsurTestService } from './rsur/rsur-test/rsur-test.service';
import { SchoolService } from './school.service';
import { ParticipCorrectionService } from './rsur/correction/particip-correction.service';
import { ClassService } from './class.service';
import { MarksService } from './rsur/rsur-test-protocol/marks.service';
import { SchoolCollectorService } from './shared/school-collector.service';
import { ResultsService } from './shared/results.service';
import { ReportService } from './rsur/reports/shared/report.service';

// Pipes
import { RsurParticipFilterPipe, RsurShowNotActualParticips } from './rsur/rsurparticip-filter.pipe';
import { LimitToPipe } from './limit-to.pipe';
import { ParticipsWithoutDetailsPipe } from './rsur/details/particips-without-details.filter';
import { ParticipFilterPipe } from './particip-filter.pipe';
import { SchoolFilter } from './school-filter.pipe';
import { ClassNameFilterPipe } from './shared/class-name-filter.pipe';
import { TestIdPipe } from './shared/test-filter.pipe';

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
		MatButtonModule,
        MatDialogModule,
        NgbModule.forRoot()
    ],

	declarations: [
        AppComponent,
        RsurHomeComponent,
	    RsurTestComponent,
        RsurParticipsComponent,	
        RsurParticipAddFormComponent,
        RsurParticipFilterPipe,
        RsurShowNotActualParticips,
		ParticipFilterPipe,
		ClassNameFilterPipe,
		LimitToPipe,
		ParticipsWithoutDetailsPipe,
		TestIdPipe,
        SchoolFilter,        
		PlanComponent,
		ResultComponent,
		ParticipDetailsComponent,		
		ParticipModalComponent,		   
        ParticipCorrectionComponent,		
		ClassParticipsListComponent,
		ExportExcelModal,
		ClassParticipMarksComponent,
		ClassParticipsExportExcelComponent,
		ClassParticipsPlanComponent,
		AddClassParticipComponent,
		UpdateClassParticipComponent,
		MarksAddAndEditComponent,
        RsurTestProtocolListComponent,
		RsurTestProtocolComponent,
		ReportComponent,
	    ReportListComponent
	],
	providers: [
        AccountService,
        RsurParticipService,
	    RsurTestService,
        SchoolService,
        ParticipCorrectionService,
        ClassService,
        ParticipService,
		MarksService,
		SchoolCollectorService,
		ResultsService,
	    ReportService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler }
	],  
	entryComponents: [
		ParticipModalComponent,				
		ExportExcelModal
	],
    bootstrap: [AppComponent]
})
export class AppModule { }