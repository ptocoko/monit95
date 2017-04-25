import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ParticipComponent } from './particip/particip.component';
import { PlanComponent } from './plan/plan.component';

import { routing } from './app.routing';

@NgModule({
    imports: [BrowserModule, routing, FormsModule],
    declarations: [AppComponent, ParticipComponent, PlanComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }