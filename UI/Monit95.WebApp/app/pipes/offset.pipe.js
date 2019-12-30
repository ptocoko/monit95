var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var OffsetPipe = /** @class */ (function () {
    function OffsetPipe() {
    }
    OffsetPipe.prototype.transform = function (values, offset) {
        if (!values || !offset)
            return values;
        return values.slice(offset, values.length);
    };
    OffsetPipe = __decorate([
        Pipe({
            name: 'offset'
        })
    ], OffsetPipe);
    return OffsetPipe;
}());
export { OffsetPipe };
//# sourceMappingURL=offset.pipe.js.map