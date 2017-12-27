"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
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
    RsurParticipActualFilterPipe = tslib_1.__decorate([
        core_1.Pipe({ name: 'rsurParticipActualFilter' })
    ], RsurParticipActualFilterPipe);
    return RsurParticipActualFilterPipe;
}());
exports.RsurParticipActualFilterPipe = RsurParticipActualFilterPipe;
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
    RsurParticipFilterPipe = tslib_1.__decorate([
        core_1.Pipe({ name: 'rsurParticipFilter' })
    ], RsurParticipFilterPipe);
    return RsurParticipFilterPipe;
}());
exports.RsurParticipFilterPipe = RsurParticipFilterPipe;
//# sourceMappingURL=rsur-particip-filter.pipe.js.map