//Modules
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { MyDatePickerModule } from 'mydatepicker';

//Components
import { AppComponent } from './app.component';
import { ParticipModalComponent } from './particips/details/particip-modal.component';
import { ResultsModalComponent } from './particips/results/results-modal.component';
import { EditModalComponent } from './particips/edit-particip/edit-modal.component';
import { ParticipsComponent } from './particips/particips.component';
import { ParticipListComponent } from './particips/particip-list.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './particips/details/particip-details.component';
import { EditParticipComponent } from './particips/edit-particip/edit-particip.component';
import { ParticipCorrectionComponent } from './particips/correction/particip-correction.component';

//Services
import { UserService } from './user.service'
import { ParticipService } from './particips/particip.service';
import { ParticipCorrectionService } from './particips/correction/particip-correction.service';

//Pipes
import { ParticipFilterPipe } from './particips/particip-filter.pipe';
import { LimitToPipe } from "./limit-to.pipe";
import { ParticipsWithoutDetailsPipe } from "./particips/details/particips-without-details.filter";

import { routing } from './app.routing';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GlobalErrorHandler } from "./error-handler";


@NgModule({
	imports: [BrowserModule, HttpModule, routing, FormsModule, ModalModule.forRoot(), BootstrapModalModule, MyDatePickerModule],
	declarations: [
		AppComponent,
		ParticipsComponent,
		ParticipListComponent,
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
        ParticipCorrectionComponent
	],
	providers: [
        UserService, ParticipService, ParticipCorrectionService,
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: ErrorHandler, useClass: GlobalErrorHandler }
	],  
	entryComponents: [ParticipModalComponent, ResultsModalComponent, EditModalComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }