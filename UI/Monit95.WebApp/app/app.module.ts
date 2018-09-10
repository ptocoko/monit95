// Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';
import { MaterialModule } from './material.module';
import { ParticipsModule } from './particips/particips.module';
import { OneTwoThreeModule } from './one-two-three/one-two-three.module';
import { SharedModule } from './shared/shared-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FirstClassModule } from './components/first-class/first-class.module';

// Components
import { AppComponent } from './components/app/app.component';
import { RsurParticipsComponent } from './components/rsur/particips/particips.component';
import { HomeComponent } from './components/rsur/home/home.component';
import { ReportComponent } from './components/rsur/reports/report/report.component';
import { ReportListComponent } from './components/rsur/reports/report-list/report-list.component';
import { RatingsComponent } from './components/rsur/ratings/ratings.component';
import { SeminarReportCreateFormComponent } from './components/rsur/seminar-reports/create-form/create-form.component';
import { SeminarReportsListComponent } from './components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component';
import { SeminarReportComponent } from './components/rsur/seminar-reports/seminar-report/seminar-report.component';
import { SchoolFilesComponent } from './components/school-files/school-files.component';
//import { MatchingProtocolComponent } from './components/rsur/protocols/matching/matching-protocol.component';
//import { ScanProtocolsComponent, FilterPipe } from './components/rsur/protocols/scan/scan-protocols.component';
import { QuestionProtocolsList } from './components/rsur/protocols/question/question-protocols-list.component';
import { MarksProtocolComponent } from './components/rsur/protocols/shared/marks-protocol.component';
import { QuestionProtocolComponent } from './components/rsur/protocols/protocol/question-protocol.component';
import { FiringListComponent } from './components/rsur/actualization/firing/list/firing-list.component';
import { HiringListComponent } from './components/rsur/actualization/hiring/list/hiring-list.component';
import { HireComponent } from './components/rsur/actualization/hiring/hire-particip.component';
import { CreateParticipComponent } from './components/rsur/actualization/hiring/add/add-particip.component';
import { TransferParticipComponent } from './components/rsur/actualization/hiring/transfer/transfer-particip.component';

// Services
import { AccountService } from './services/account.service';
import { ParticipService } from './services/particip.service';
import { RsurParticipService } from './services/rsur-particip.service';
import { ClassService } from './services/class.service';
import { SchoolCollectorService } from './shared/school-collector.service';
import { RsurReportService } from './services/rsur-report.service';
import { RsurRatingService } from './services/rsur-rating.service';
import { SeminarReportService } from './services/seminar-report.service';
import { SchoolFileService } from './services/school-file.service';
import { RsurProtocolsService } from './services/rsur-protocols.service';
import { SchoolService } from './school.service';
import { AreaService } from './services/area.service';

// Pipes
//import { LimitToPipe } from './limit-to.pipe';
//import { ParticipFilterPipe } from './pipes/particip-filter.pipe';
import { SchoolFilter } from './school-filter.pipe';
import { ClassNameFilterPipe } from './shared/class-name-filter.pipe';
import { SchoolNameFilterPipe, TestNameWithDateFilterPipe, TestIdPipe, TotalFilterPipe, ExamNameFilterPipe } from './pipes/rsur-report-filter.pipe';
import { SubjectFilterPipe } from './components/rsur/ratings/subject-filter.pipe';
import { RsurParticipFilterPipe, RsurParticipActualFilterPipe } from './pipes/rsur-particip-filter.pipe';
import { RsurProtocolFilter } from './pipes/rsur-protocol-filter.pipe';
//import { OffsetPipe } from './pipes/offset.pipe';

// Additional 
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GlobalErrorHandler } from './error-handler';
import { MatPaginatorIntl } from '@angular/material';
import { RussianMatPaginator } from './shared/russian-paginator.provider';
import { CustomReuseStrategy } from './custom-route-reuse-strategy';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,        
        FormsModule,
        ReactiveFormsModule,        
        MyDatePickerModule, 
		BrowserAnimationsModule,		
        OrderModule,	
		NgbModule.forRoot(),
		SharedModule,
		MaterialModule,
		ParticipsModule,
		OneTwoThreeModule,
		FirstClassModule,
        RouterModule.forRoot([
                { path: 'rsur', component: HomeComponent },
				{ path: 'rsur/particips', component: RsurParticipsComponent },
				{ path: 'rsur/actualization/firing/list', component: FiringListComponent },
				{ path: 'rsur/actualization/hiring/list', component: HiringListComponent },
				{ path: 'rsur/actualization/hire', component: HireComponent },
                { path: 'rsur/seminar-reports', component: SeminarReportsListComponent },
                { path: 'rsur/seminar-reports/create', component: SeminarReportCreateFormComponent },
				{ path: 'rsur/seminar-reports/:id', component: SeminarReportComponent },                
                { path: 'rsur/report/:id', component: ReportComponent },
                { path: 'rsur/results-list', component: ReportListComponent },
				{ path: 'rsur/ratings', component: RatingsComponent },
				//{ path: 'rsur/match-protocol/:id', component: MatchingProtocolComponent },
				//{ path: 'rsur/scan-protocols', component: ScanProtocolsComponent },
				{ path: 'rsur/question-protocols', component: QuestionProtocolsList },
				{ path: 'rsur/question-protocol/:participCode', component: QuestionProtocolComponent },
                { path: 'school-files', component: SchoolFilesComponent },
                { path: '', redirectTo: '/rsur', pathMatch: 'full' }
            ]
        )
    ],
	declarations: [
        AppComponent,
        HomeComponent,
        RsurParticipsComponent,
        RsurParticipFilterPipe,
		ClassNameFilterPipe,
		//LimitToPipe,
		//OffsetPipe,
		TestIdPipe,
		//FilterPipe,
		SchoolFilter,    
		RsurProtocolFilter,
        SchoolNameFilterPipe,
        TestNameWithDateFilterPipe,
        TotalFilterPipe,
        SubjectFilterPipe,
		RsurParticipActualFilterPipe,
		ExamNameFilterPipe,
		ReportComponent,
	    ReportListComponent,			
        SeminarReportCreateFormComponent,
		RatingsComponent,
		SeminarReportsListComponent,
        SeminarReportComponent,
		SchoolFilesComponent,
		//MatchingProtocolComponent,
		//ScanProtocolsComponent,
		QuestionProtocolsList,
		QuestionProtocolComponent,
		FiringListComponent,
		HiringListComponent,
		HireComponent,
		CreateParticipComponent,
		TransferParticipComponent
	],
	providers: [
        AccountService,
        RsurParticipService,
        ClassService,
		SchoolCollectorService,
	    RsurReportService,
		RsurRatingService,
        SeminarReportService,
		SchoolFileService,
		RsurProtocolsService,
		SchoolService,
		AreaService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler },
		{ provide: MatPaginatorIntl, useClass: RussianMatPaginator },
		{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    ],    
    bootstrap: [AppComponent]
})
export class AppModule { }