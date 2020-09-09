var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared-module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParticipsListComponent } from './particips/list/particips-list.component';
import { ParticipService } from '../services/one-two-three/particips.service';
import { AddOrUpdateComponent } from './particips/add-or-update/add-or-update.component';
import { ProtocolsListComponent } from './question-protocols/list/protocols-list.component';
import { QuestionProtocolService } from '../services/one-two-three/question-protocols.service';
import { ProtocolComponent } from './question-protocols/protocol/protocol.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
var routes = [
    { path: 'one-two-three/home', component: HomeComponent },
    { path: 'one-two-three/particips/list', component: ParticipsListComponent },
    { path: 'one-two-three/particips/add', component: AddOrUpdateComponent },
    { path: 'one-two-three/particips/:participId', component: AddOrUpdateComponent },
    { path: 'one-two-three/protocols/:projectTestId', component: ProtocolsListComponent },
    { path: 'one-two-three/protocol/:participTestId', component: ProtocolComponent },
    { path: 'one-two-three', redirectTo: 'one-two-three/home', pathMatch: 'full' }
];
var OneTwoThreeModule = /** @class */ (function () {
    function OneTwoThreeModule() {
    }
    OneTwoThreeModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                SharedModule,
                MaterialModule,
                NgbModule,
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
                QuestionProtocolService
            ]
        })
    ], OneTwoThreeModule);
    return OneTwoThreeModule;
}());
export { OneTwoThreeModule };
//# sourceMappingURL=one-two-three.module.js.map