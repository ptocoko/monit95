var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared-module';
import { ParticipsService } from '../../services/refactored/particips.service';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
var routes = [
    //{ path: 'particips/home', component: HomeComponent },
    { path: 'particips2/list', component: ListComponent },
    { path: 'particips2/new', component: AddComponent },
];
var ParticipsModule2 = /** @class */ (function () {
    function ParticipsModule2() {
    }
    ParticipsModule2 = __decorate([
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
            exports: [
                RouterModule
            ],
            declarations: [
                ListComponent,
                AddComponent
            ],
            providers: [
                ParticipsService
            ]
        })
    ], ParticipsModule2);
    return ParticipsModule2;
}());
export { ParticipsModule2 };
//# sourceMappingURL=particips.module.js.map