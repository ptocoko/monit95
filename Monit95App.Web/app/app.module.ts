import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ParticipsComponent } from './particips/particips.component';
import { ParticipListComponent } from './particips/particip-list.component';
import { PlanComponent } from './plan/plan.component';

import { ParticipFilterPipe } from './particips/particip-filter.pipe';
import { UserService } from './user.service'
import { routing } from './app.routing';

@NgModule({
    imports: [BrowserModule, HttpModule, routing, FormsModule],
    declarations: [AppComponent, ParticipsComponent, ParticipListComponent, ParticipFilterPipe, PlanComponent],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule { }