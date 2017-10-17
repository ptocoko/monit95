"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RsurParticipFilterPipe = (function () {
    function RsurParticipFilterPipe() {
    }
    RsurParticipFilterPipe.prototype.transform = function (particips, searchText) {
        if (searchText == null)
            return particips;
        return particips.filter(function (particip) {
            if (particip.Surname) {
                return particip.Code.toString().indexOf(searchText) > -1
                    || particip.Surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                    || particip.Name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
            }
            else {
                return particip.Code.toString().indexOf(searchText) > -1;
            }
        });
    };
    return RsurParticipFilterPipe;
}());
RsurParticipFilterPipe = __decorate([
    core_1.Pipe({ name: 'rsurParticipFilter' })
], RsurParticipFilterPipe);
exports.RsurParticipFilterPipe = RsurParticipFilterPipe;
var RsurShowNotActualParticips = (function () {
    function RsurShowNotActualParticips() {
    }
    RsurShowNotActualParticips.prototype.transform = function (particips, isShowNotActual) {
        if (isShowNotActual)
            return particips;
        else {
            return particips.filter(function (particip) { return particip.ActualCode === 1; });
        }
    };
    return RsurShowNotActualParticips;
}());
RsurShowNotActualParticips = __decorate([
    core_1.Pipe({ name: 'rsurIsShowNotActual' })
], RsurShowNotActualParticips);
exports.RsurShowNotActualParticips = RsurShowNotActualParticips;
//return particips.filter(function (particip: any) {
//    return particip.participCode.indexOf(searchText.toLowerCase()) > -1
//        || particip.surname.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
//}) 
//# sourceMappingURL=rsurparticip-filter.pipe.js.map