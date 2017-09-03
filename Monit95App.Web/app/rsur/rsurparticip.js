"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var RsurParticip = (function (_super) {
    __extends(RsurParticip, _super);
    function RsurParticip(Code, Surname, Name, RsurSubjectName, SchoolIdWithName, CategoryName, AreaCodeWithName, Birthday, Experience, Phone, ClassNumbers, ActualCode, Email, SecondName, SchoolIdFrom) {
        var _this = _super.call(this) || this;
        _this.Code = Code;
        _this.Surname = Surname;
        _this.Name = Name;
        _this.RsurSubjectName = RsurSubjectName;
        _this.SchoolIdWithName = SchoolIdWithName;
        _this.CategoryName = CategoryName;
        _this.AreaCodeWithName = AreaCodeWithName;
        _this.Birthday = Birthday;
        _this.Experience = Experience;
        _this.Phone = Phone;
        _this.ClassNumbers = ClassNumbers;
        _this.ActualCode = ActualCode;
        _this.Email = Email;
        _this.SecondName = SecondName;
        _this.SchoolIdFrom = SchoolIdFrom;
        return _this;
    }
    return RsurParticip;
}(bootstrap_1.BSModalContext));
exports.RsurParticip = RsurParticip;
//# sourceMappingURL=rsurparticip.js.map