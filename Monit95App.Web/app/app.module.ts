//Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { RouterModule } from '@angular/router';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { MyDatePickerModule } from 'mydatepicker';

//Components
import { AppComponent } from './app.component';
import { ParticipModalComponent } from './rsur/details/particip-modal.component';
import { ResultsModalComponent } from './rsur/results/results-modal.component';
import { EditModalComponent } from './rsur/edit-particip/edit-modal.component';
import { RsurParticipComponent } from './rsur/rsurparticip.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './rsur/details/particip-details.component';
import { EditParticipComponent } from './rsur/edit-particip/edit-particip.component';
import { ParticipCorrectionComponent } from './rsur/correction/particip-correction.component';
import { ParticipFormComponent } from './rsur/particip-form/particip-form.component';
import { AddClassParticipModal } from './class-particips/add-class-particip.modal';
import { ExportExcelModal } from './class-particips/export-excel-modal.component';
import { ClassParticipsListComponent } from './class-particips/class-particips-list.component';

//Services
import { AccountService } from './account/account.service';
import { RsurParticipService } from './rsur/rsurparticip.service';
import { ParticipCorrectionService } from './rsur/correction/particip-correction.service';
import { ClassService } from './class.service';

//Pipes
import { RsurParticipFilterPipe } from './rsur/rsurparticip-filter.pipe';
import { LimitToPipe } from './limit-to.pipe';
import { ParticipsWithoutDetailsPipe } from './rsur/details/particips-without-details.filter';
import { ParticipFilterPipe } from './particip-filter.pipe';

import { routing } from './app.routing';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GlobalErrorHandler } from './error-handler';


@NgModule({
	imports: [BrowserModule, HttpModule, routing, FormsModule, ModalModule.forRoot(), BootstrapModalModule, MyDatePickerModule],
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
		EditParticipComponent,
		ParticipModalComponent,
		ResultsModalComponent,
        EditModalComponent,
        ParticipCorrectionComponent,
		ParticipFormComponent,
		ClassParticipsListComponent,
		ExportExcelModal,
		AddClassParticipModal
	],
	providers: [
        AccountService, RsurParticipService, ParticipCorrectionService, ClassService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler }
	],  
	entryComponents: [
		ParticipModalComponent,
		ResultsModalComponent,
		EditModalComponent,
		ParticipFormComponent,
		ExportExcelModal,
		AddClassParticipModal
	],
    bootstrap: [AppComponent]
})
export class AppModule { }