var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var RsurParticipActualFilterPipe = /** @class */ (function () {
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
    RsurParticipActualFilterPipe = __decorate([
        Pipe({ name: 'rsurParticipActualFilter' })
    ], RsurParticipActualFilterPipe);
    return RsurParticipActualFilterPipe;
}());
export { RsurParticipActualFilterPipe };
var RsurParticipFilterPipe = /** @class */ (function () {
    function RsurParticipFilterPipe() {
    }
    RsurParticipFilterPipe.prototype.transform = function (particips, searchText) {
        if (!searchText) {
            return particips;
        }
        var codePropertyName;
        if (particips[0].Code) {
            codePropertyName = 'Code';
        }
        else if (particips[0].RsurParticipCode) {
            codePropertyName = 'RsurParticipCode';
        }
        else if (particips[0].ParticipCode) {
            codePropertyName = 'ParticipCode';
        }
        else {
            throw Error("Can't find particip code property");
        }
        searchText = searchText.toLowerCase();
        particips = particips.filter(function (particip) {
            // for particips.component.html
            if (particip.SchoolParticipInfo) {
                return particip[codePropertyName].toString().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Surname.toLowerCase().indexOf(searchText) > -1 ||
                    particip.SchoolParticipInfo.Name.toLowerCase().indexOf(searchText) > -1;
            }
            else if (particip.Surname) {
                return particip[codePropertyName].toString().indexOf(searchText) > -1
                    || particip.Surname.toLowerCase().indexOf(searchText) > -1
                    || particip.Name.toLowerCase().indexOf(searchText) > -1;
            }
        });
        return particips;
    };
    RsurParticipFilterPipe = __decorate([
        Pipe({ name: 'rsurParticipFilter' })
    ], RsurParticipFilterPipe);
    return RsurParticipFilterPipe;
}());
export { RsurParticipFilterPipe };
//# sourceMappingURL=rsur-particip-filter.pipe.js.map