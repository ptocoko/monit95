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
import { NgbdModalContent } from './particips/particip-modal.component';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ParticipFilterPipe } from './particips/particip-filter.pipe';
import { UserService } from './user.service'
import { routing } from './app.routing';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
    imports: [BrowserModule, HttpModule, routing, FormsModule, Ng2Bs3ModalModule],
	declarations: [AppComponent, ParticipsComponent, ParticipListComponent, ParticipFilterPipe, PlanComponent, ResultComponent, ParticipDetailsComponent, NgbdModalContent],
    providers: [UserService, {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
	}],  
	entryComponents: [NgbdModalContent],
    bootstrap: [AppComponent]
})
export class AppModule { }