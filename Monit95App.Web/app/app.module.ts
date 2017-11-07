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
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';

// Components
import { AppComponent } from './app.component';
import { ParticipModalComponent } from './rsur/details/particip-modal.component';
import { RsurParticipsComponent } from './rsur/rsur-particips/rsur-particips.component';
import { RsurParticipAddFormComponent } from './rsur/rsurparticip-add-form/rsurparticip-add-form.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './rsur/details/particip-details.component';
import { ParticipCorrectionComponent } from './rsur/correction/particip-correction.component';
import { ExportExcelModal } from './class-particips/excel-export/export-excel-modal.component';
import { ClassParticipsListComponent } from './class-particips/class-particips-list.component';
import { ClassParticipMarksComponent } from './class-particips/marks/marks.component';
import { ClassParticipsExportExcelComponent } from './class-particips/excel-export/export-excel.component';
import { ClassParticipsPlanComponent } from './class-particips/class-particips-plan.component';
import { AddClassParticipComponent } from './class-particips/add-and-update/add.component';
import { UpdateClassParticipComponent } from './class-particips/add-and-update/update.component';
import { MarksAddAndEditComponent } from './class-particips/marks/marks-add-and-edit.component';
import { RsurTestProtocolListComponent } from './rsur/rsur-test-protocol/rsur-test-protocol-list.component';
import { RsurTestProtocolComponent } from './rsur/rsur-test-protocol/rsur-test-protocol.component';
import { RsurTestComponent } from './rsur/rsur-test/rsur-test.component';
import { HomeComponent } from './components/rsur/home/home.component';
import { ReportComponent } from './components/rsur/reports/report/report.component';
import { ReportListComponent } from './components/rsur/reports/report-list/report-list.component';
import { UploadReportComponent } from './components/rsur/seminar-report/add-form/upload-report.component';
import { RatingsComponent } from './components/rsur/ratings/ratings.component';

// Services
import { AccountService } from './services/account.service';
import { ParticipService } from './particip.service';
import { RsurParticipService } from './rsur/rsurparticip.service';
import { RsurTestService } from './rsur/rsur-test/rsur-test.service';
import { SchoolService } from './school.service';
import { ParticipCorrectionService } from './rsur/correction/particip-correction.service';
import { ClassService } from './class.service';
import { MarksService } from './rsur/rsur-test-protocol/marks.service';
import { SchoolCollectorService } from './shared/school-collector.service';
import { ResultsService } from './shared/results.service';
import { UploadReportService } from './components/rsur/seminar-report/add-form/upload-report.service';
import { RsurReportService } from './services/rsur-report.service';
import { RsurRatingService } from './services/rsur-rating.service';

// Pipes
import { RsurShowNotActualParticips } from './rsur/rsurparticip-filter.pipe';
import { LimitToPipe } from './limit-to.pipe';
import { ParticipsWithoutDetailsPipe } from './rsur/details/particips-without-details.filter';
import { ParticipFilterPipe } from './particip-filter.pipe';
import { SchoolFilter } from './school-filter.pipe';
import { ClassNameFilterPipe } from './shared/class-name-filter.pipe';
import { SchoolNameFilterPipe, TestNameWithDateFilterPipe, TestIdPipe, RsurParticipFilterPipe, TotalFilterPipe } from './components/rsur/reports/report-list/report-filter.pipe';
import { SubjectFilterPipe } from './components/rsur/ratings/subject-filter.pipe';

// Additional 
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GlobalErrorHandler } from './error-handler';
import { SeminarReportsListComponent } from "./components/rsur/seminar-report/reports-list.component";

@NgModule({
    imports: [
        BrowserModule,
		HttpModule,
		HttpClientModule,        
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        MyDatePickerModule, 
		BrowserAnimationsModule,
		MatButtonModule,
        MatDialogModule,
        OrderModule,
		NgbModule.forRoot(),
        RouterModule.forRoot([
                { path: 'rsur', component: HomeComponent },
                { path: 'rsur/test', component: RsurTestComponent },
                { path: 'rsur/particips', component: RsurParticipsComponent },
                { path: 'rsur/particips/add', component: RsurParticipAddFormComponent },
                { path: 'rsur/tests/:id/protocols', component: RsurTestProtocolListComponent },
				{ path: 'rsur/testprotocols/:id', component: RsurTestProtocolComponent },
				{ path: 'rsur/seminar-reports', component: SeminarReportsListComponent },
                { path: 'rsur/upload-report', component: UploadReportComponent },
                { path: 'rsur/report/:id', component: ReportComponent },
                { path: 'rsur/results-list', component: ReportListComponent },
                { path: 'rsur/ratings', component: RatingsComponent },
                { path: 'plan', component: PlanComponent },
                { path: 'result', component: ResultComponent },
                { path: 'details', component: ParticipDetailsComponent },
                { path: 'particip-correction', component: ParticipCorrectionComponent },
                { path: 'class-particips', component: ClassParticipsPlanComponent },
                { path: 'class-particips/list', component: ClassParticipsListComponent },
                { path: 'class-particips/upload-excel', component: ClassParticipsExportExcelComponent },
                { path: 'class-particips/new', component: AddClassParticipComponent },
                { path: 'class-particips/update/:id', component: UpdateClassParticipComponent },
                { path: 'class-particips/marks', component: ClassParticipMarksComponent },
                { path: 'class-particips/marks-edit/:participTestId', component: MarksAddAndEditComponent },
                { path: '', redirectTo: '/rsur', pathMatch: 'full' }
            ]
        )
    ],

	declarations: [
        AppComponent,
        HomeComponent,
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
        SchoolNameFilterPipe,
        TestNameWithDateFilterPipe,
        TotalFilterPipe,
	    SubjectFilterPipe,
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
	    ReportListComponent,			
        UploadReportComponent,
		RatingsComponent,
		SeminarReportsListComponent
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
	    RsurReportService,		
        UploadReportService,
	    RsurRatingService,
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