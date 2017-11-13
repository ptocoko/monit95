"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RsurParticipActualFilterPipe = (function () {
    function RsurParticipActualFilterPipe() {
    }
    RsurParticipActualFilterPipe.prototype.transform = function (particips, isShowNotActual) {
        if (isShowNotActual == false) {
            return particips.filter(function (particip) {
                return particip.ActualCode === 1;
            });
        }
        return particips;
    };
    return RsurParticipActualFilterPipe;
}());
RsurParticipActualFilterPipe = __decorate([
    core_1.Pipe({ name: 'rsurParticipActualFilter' })
], RsurParticipActualFilterPipe);
exports.RsurParticipActualFilterPipe = RsurParticipActualFilterPipe;
var RsurParticipFilterPipe = (function () {
    function RsurParticipFilterPipe() {
    }
    RsurParticipFilterPipe.prototype.transform = function (particips, searchText) {
        if (searchText == null) {
            return particips;
        }
        console.log(particips);
        console.log(searchText);
        searchText = searchText.toLowerCase();
        particips = particips.filter(function (particip) {
            // for particips.component.html
            if (particip.SchoolParticipInfo) {
                return particip.Code.toString().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Surname.toLowerCase().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Name.toLowerCase().indexOf(searchText) > -1;
            }
            else if (particip.Surname) {
                return particip.Code.toString().indexOf(searchText) > -1
                    || particip.Surname.toLowerCase().indexOf(searchText) > -1
                    || particip.Name.toLowerCase().indexOf(searchText) > -1;
            }
        });
        return particips;
    };
    return RsurParticipFilterPipe;
}());
RsurParticipFilterPipe = __decorate([
    core_1.Pipe({ name: 'rsurParticipFilter' })
], RsurParticipFilterPipe);
exports.RsurParticipFilterPipe = RsurParticipFilterPipe;
//# sourceMappingURL=rsur-particip-filter.pipe.js.map