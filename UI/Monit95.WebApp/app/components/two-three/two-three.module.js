var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared-module';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
var routes = [
    { path: 'two-three/home', component: HomeComponent },
    { path: 'two-three', redirectTo: 'two-three/home', pathMatch: 'full' }
];
var TwoThreeModule = /** @class */ (function () {
    function TwoThreeModule() {
    }
    TwoThreeModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                HttpClientModule,
                SharedModule,
                MaterialModule,
                RouterModule.forChild(routes)
            ],
            exports: [RouterModule],
            declarations: [HomeComponent]
        })
    ], TwoThreeModule);
    return TwoThreeModule;
}());
export { TwoThreeModule };
//# sourceMappingURL=two-three.module.js.map