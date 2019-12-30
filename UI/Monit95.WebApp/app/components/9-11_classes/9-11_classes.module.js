var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
var routes = [
    { path: '9-11_classes/home', component: HomeComponent }
];
var DamnClassesModule = /** @class */ (function () {
    function DamnClassesModule() {
    }
    DamnClassesModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(routes)
            ],
            exports: [
                RouterModule
            ],
            declarations: [HomeComponent]
        })
    ], DamnClassesModule);
    return DamnClassesModule;
}());
export { DamnClassesModule };
//# sourceMappingURL=9-11_classes.module.js.map