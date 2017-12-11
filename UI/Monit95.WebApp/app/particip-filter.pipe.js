"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ParticipFilterPipe = /** @class */ (function () {
    function ParticipFilterPipe() {
    }
    ParticipFilterPipe.prototype.transform = function (particips, searchText) {
        if (searchText == null)
            return particips;
        return particips.filter(function (particip) {
            var FIO = particip.Surname + particip.Name;
            return FIO.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        });
    };
    ParticipFilterPipe = tslib_1.__decorate([
        core_1.Pipe({ name: 'participFilter' })
    ], ParticipFilterPipe);
    return ParticipFilterPipe;
}());
exports.ParticipFilterPipe = ParticipFilterPipe;
//# sourceMappingURL=particip-filter.pipe.js.map