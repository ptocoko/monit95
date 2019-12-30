var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var ParticipFilterPipe = /** @class */ (function () {
    function ParticipFilterPipe() {
    }
    ParticipFilterPipe.prototype.transform = function (particips, searchText) {
        if (searchText == null)
            return particips;
        return particips.filter(function (particip) {
            //let FIO = particip.Surname + particip.Name + particip.DocumNumber;
            //return FIO.toLowerCase().indexOf(searchText.toLowerCase()) > -1
            return particip.Surname.trim().toLowerCase().indexOf(searchText) > -1
                || particip.Name.trim().toLowerCase().indexOf(searchText) > -1
                || particip.DocumNumber.toString().trim().toLowerCase().indexOf(searchText) > -1;
        });
    };
    ParticipFilterPipe = __decorate([
        Pipe({ name: 'participFilter' })
    ], ParticipFilterPipe);
    return ParticipFilterPipe;
}());
export { ParticipFilterPipe };
//# sourceMappingURL=particip-filter.pipe.js.map