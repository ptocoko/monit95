var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParticipsListComponent } from './particips/list/particips-list.component';
import { AddOrUpdateComponent } from './particips/add-or-update/add-or-update.component';
import { SharedModule } from '../../shared/shared-module';
import { MaterialModule } from '../../material.module';
import { ParticipService } from '../../services/first-class/particips.service';
import { ProtocolsService } from '../../services/first-class/protocols.service';
import { ProtocolsListComponent } from './protocols/list/protocols-list.component';
import { ProtocolComponent } from './protocols/protocol/protocol.component';
var routes = [
    { path: 'first-class/home', component: HomeComponent },
    { path: 'first-class/particips/list', component: ParticipsListComponent },
    { path: 'first-class/particips/add', component: AddOrUpdateComponent },
    { path: 'first-class/particips/:participId', component: AddOrUpdateComponent },
    { path: 'first-class/protocols/list', component: ProtocolsListComponent },
    { path: 'first-class/protocol/:participTestId', component: ProtocolComponent },
    { path: 'first-class', redirectTo: 'first-class/home', pathMatch: 'full' }
];
var FirstClassModule = /** @class */ (function () {
    function FirstClassModule() {
    }
    FirstClassModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule,
                MaterialModule,
                RouterModule.forChild(routes)
            ],
            exports: [RouterModule],
            declarations: [
                HomeComponent,
                ParticipsListComponent,
                AddOrUpdateComponent,
                ProtocolsListComponent,
                ProtocolComponent
            ],
            providers: [
                ParticipService,
                ProtocolsService
            ]
        })
    ], FirstClassModule);
    return FirstClassModule;
}());
export { FirstClassModule };
//# sourceMappingURL=first-class.module.js.map