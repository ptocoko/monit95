"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//@Pipe({name: 'rsurParticipFilter'})
//export class RsurParticipFilterPipe implements PipeTransform {
//    transform(particips: RsurParticipModel[], isShowNotActual: boolean) {
//        if (isShowNotActual) return particips;
//        else {
//            return particips.filter((particip: RsurParticipModel) => particip.ActualCode === 1);
//        }
//    }
//}
var RsurParticipFilterPipe = (function () {
    function RsurParticipFilterPipe() {
    }
    RsurParticipFilterPipe.prototype.transform = function (particips, searchText, isShowNotActual) {
        if (searchText == null) {
            return particips;
        }
        searchText = searchText.toLowerCase();
        particips = particips.filter(function (particip) {
            // for particips.component.html
            if (particip.Code) {
                return particip.Code.toString().indexOf(searchText) > -1
                    || particip.Surname.toLowerCase().indexOf(searchText) > -1
                    || particip.Name.toLowerCase().indexOf(searchText) > -1;
            }
            else if (particip.SchoolParticipInfo) {
                return particip.Code.toString().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Surname.toLowerCase().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Name.toLowerCase().indexOf(searchText) > -1;
            }
            //if (isShowNotActual) {
            //    particips = particips.filter((particip: any) => {
            //        return particip.ActualCode === 0
            //    });
            //}
            //else if (particip.RsurParticipCode) {
            //    return particip.RsurParticipCode.toString().indexOf(searchText) > -1;
            //}                                               
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