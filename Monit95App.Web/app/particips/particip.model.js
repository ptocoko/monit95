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
var ParticipModel = (function (_super) {
    __extends(ParticipModel, _super);
    function ParticipModel(participCode, surname, name, secondName, subjectName, birthday, classes
        //public schoolIdWithName: string,
        //public categName: string,
        //public experience: number,
        //public phone: string,
        //public email?: string
    ) {
        var _this = _super.call(this) || this;
        _this.participCode = participCode;
        _this.surname = surname;
        _this.name = name;
        _this.secondName = secondName;
        _this.subjectName = subjectName;
        _this.birthday = birthday;
        _this.classes = classes;
        return _this;
    }
    return ParticipModel;
}(bootstrap_1.BSModalContext));
exports.ParticipModel = ParticipModel;
//# sourceMappingURL=particip.model.js.map