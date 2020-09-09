var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared/shared-module';
import { SchoolsProfileService } from '../../services/schools-profile/schools-profile.service';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
var routes = [
    { path: 'schools-profile', component: ProfileComponent }
];
var SchoolsProfileModule = /** @class */ (function () {
    function SchoolsProfileModule() {
    }
    SchoolsProfileModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, MaterialModule, RouterModule.forChild(routes)],
            declarations: [ProfileComponent],
            providers: [SchoolsProfileService]
        })
    ], SchoolsProfileModule);
    return SchoolsProfileModule;
}());
export { SchoolsProfileModule };
//# sourceMappingURL=schools-profile.module.js.map