var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PersonModel } from './person.model';
var SchoolParticip = /** @class */ (function (_super) {
    __extends(SchoolParticip, _super);
    function SchoolParticip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SchoolParticip;
}(PersonModel));
export { SchoolParticip };
//# sourceMappingURL=school-particip.model.js.map