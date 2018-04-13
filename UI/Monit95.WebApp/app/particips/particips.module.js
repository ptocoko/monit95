"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
//import { ParticipsListComponent } from './list/particips-list.component';
//import { ParticipService } from '../services/particip.service';
var home_component_1 = require("./home/home.component");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
//import { ParticipFilterPipe } from '../pipes/particip-filter.pipe';
var material_module_1 = require("../material.module");
//import { ProtocolsComponent } from './protocols/protocols.component';
//import { AddParticipComponent } from './add-and-update/add.component';
//import { ParticipProtocolsService } from '../services/particip-protocols.service';
//import { ParticipProtocolComponent } from './protocols/protocol/protocol.component';
//import { MarksProtocolComponent } from '../components/rsur/protocols/shared/marks-protocol.component';
var shared_module_1 = require("../shared/shared-module");
var routes = [
    { path: 'particips/home', component: home_component_1.HomeComponent },
    //{ path: 'particips/list', component: ParticipsListComponent },
    //{ path: 'particips/new', component: AddParticipComponent },
    //{ path: 'particips/protocols', component: ProtocolsComponent },
    //{ path: 'particips/protocol/:id', component: ParticipProtocolComponent },
    //{ path: 'particips/put-protocol/:id', component: ParticipProtocolComponent, data: { restMethod: 'PUT' } },
    { path: 'particips', redirectTo: 'particips/home', pathMatch: 'full' },
];
var ParticipsModule = /** @class */ (function () {
    function ParticipsModule() {
    }
    ParticipsModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                material_module_1.MaterialModule,
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: [
                home_component_1.HomeComponent,
            ],
        })
    ], ParticipsModule);
    return ParticipsModule;
}());
exports.ParticipsModule = ParticipsModule;
//# sourceMappingURL=particips.module.js.map