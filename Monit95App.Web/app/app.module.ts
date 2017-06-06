import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ParticipsComponent } from './particips/particips.component';
import { ParticipListComponent } from './particips/particip-list.component';
import { PlanComponent } from './plan/plan.component';
import { ResultComponent } from './result/result.component';
import { ParticipDetailsComponent } from './particips/particip-details.component';
import { ParticipModalComponent } from './particips/particip-modal.component';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { MyDatePickerModule } from 'mydatepicker';

import { ParticipFilterPipe } from './particips/particip-filter.pipe';
import { UserService } from './user.service'
import { routing } from './app.routing';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
	imports: [BrowserModule, HttpModule, routing, FormsModule, ModalModule.forRoot(), BootstrapModalModule, MyDatePickerModule],
	declarations: [AppComponent, ParticipsComponent, ParticipListComponent, ParticipFilterPipe, PlanComponent, ResultComponent, ParticipDetailsComponent, ParticipModalComponent],
    providers: [UserService, {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
	}],  
	entryComponents: [ParticipModalComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }