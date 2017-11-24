// Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { MatButtonModule, MatDialogModule, MatCardModule, MatTableModule, MatSortModule, MatProgressSpinnerModule, MatInputModule, MatFormFieldModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';

// Components
import { AppComponent } from './app.component';
import { RsurParticipsComponent } from './components/rsur/particips/particips.component';
import { RsurParticipAddFormComponent } from './rsur/rsurparticip-add-form/rsurparticip-add-form.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipCorrectionComponent } from './rsur/correction/particip-correction.component';
import { ClassParticipsListComponent } from './class-particips/class-particips-list.component';
import { ClassParticipMarksComponent } from './class-particips/marks/marks.component';
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
import { CreateReportFormComponent } from './components/rsur/seminar-reports/seminar-report/create-form/create-form.component';
import { RatingsComponent } from './components/rsur/ratings/ratings.component';
import { SeminarReportsListComponent } from "./components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component";
import { SeminarReportComponent } from "./components/rsur/seminar-reports/seminar-report/seminar-report.component";
import { SchoolFilesComponent } from "./components/school-files/school-files.component";
import { MatchingProtocolComponent } from "./components/rsur/protocols/protocol/matching-protocol/matching-protocol.component";
import { ScanProtocolsComponent } from "./components/rsur/protocols/scan-protocols.component";

// Services
import { AccountService } from './services/account.service';
import { ParticipService } from './particip.service';
import { RsurParticipService } from './services/rsur-particip.service';
import { RsurTestService } from './rsur/rsur-test/rsur-test.service';
import { SchoolService } from './school.service';
import { ParticipCorrectionService } from './rsur/correction/particip-correction.service';
import { ClassService } from './class.service';
import { MarksService } from './rsur/rsur-test-protocol/marks.service';
import { SchoolCollectorService } from './shared/school-collector.service';
import { ResultsService } from './shared/results.service';
import { RsurReportService } from './services/rsur-report.service';
import { RsurRatingService } from './services/rsur-rating.service';
import { SeminarReportService } from "./services/seminar-report.service";
import { SchoolFileService } from "./services/school-file.service";
import { RsurProtocolsService } from "./services/rsur-protocols.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Pipes
import { LimitToPipe } from './limit-to.pipe';
import { ParticipsWithoutDetailsPipe } from './rsur/details/particips-without-details.filter';
import { ParticipFilterPipe } from './particip-filter.pipe';
import { SchoolFilter } from './school-filter.pipe';
import { ClassNameFilterPipe } from './shared/class-name-filter.pipe';
import { SchoolNameFilterPipe, TestNameWithDateFilterPipe, TestIdPipe, TotalFilterPipe } from './pipes/rsur-report-filter.pipe';
import { SubjectFilterPipe } from './components/rsur/ratings/subject-filter.pipe';
import { RsurParticipFilterPipe, RsurParticipActualFilterPipe } from './pipes/rsur-particip-filter.pipe';

// Additional 
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GlobalErrorHandler } from './error-handler';

@NgModule({
    imports: [
        BrowserModule,
		HttpModule,
		HttpClientModule,        
        FormsModule,
        ReactiveFormsModule,        
        MyDatePickerModule, 
		BrowserAnimationsModule,
		MatButtonModule,
		MatDialogModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
        MatTableModule,
		MatSortModule,
		MatProgressSpinnerModule,
		MatToolbarModule,
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
				{ path: 'rsur/seminar-reports/:id', component: SeminarReportComponent },
				{ path: 'rsur/upload-report', component: CreateReportFormComponent },
                { path: 'rsur/report/:id', component: ReportComponent },
                { path: 'rsur/results-list', component: ReportListComponent },
				{ path: 'rsur/ratings', component: RatingsComponent },
				{ path: 'rsur/match-protocol/:id', component: MatchingProtocolComponent },
				{ path: 'rsur/scan-protocols', component: ScanProtocolsComponent },
                { path: 'school-files', component: SchoolFilesComponent },
                { path: 'plan', component: PlanComponent },
                { path: 'result', component: ResultComponent },                
                { path: 'particip-correction', component: ParticipCorrectionComponent },
                { path: 'class-particips', component: ClassParticipsPlanComponent },
                { path: 'class-particips/list', component: ClassParticipsListComponent },                
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
        RsurParticipActualFilterPipe,
		PlanComponent,
		ResultComponent,   
        ParticipCorrectionComponent,		
		ClassParticipsListComponent,		
		ClassParticipMarksComponent,		
		ClassParticipsPlanComponent,
		AddClassParticipComponent,
		UpdateClassParticipComponent,
		MarksAddAndEditComponent,
        RsurTestProtocolListComponent,
		RsurTestProtocolComponent,
		ReportComponent,
	    ReportListComponent,			
		CreateReportFormComponent,
		RatingsComponent,
		SeminarReportsListComponent,
        SeminarReportComponent,
		SchoolFilesComponent,
		MatchingProtocolComponent,
		ScanProtocolsComponent
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
		RsurRatingService,
        SeminarReportService,
		SchoolFileService,
		RsurProtocolsService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler }
	],  
	entryComponents: [
		
	],
    bootstrap: [AppComponent]
})
export class AppModule { }