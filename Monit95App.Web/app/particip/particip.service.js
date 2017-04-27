"use strict";
var particip_1 = require("./particip");
var ParticipService = (function () {
    function ParticipService() {
        this.data = [
            { surname: "Shakhabov", name: "Adam" },
            { surname: "Muciev", name: "Adlan" }
        ];
    }
    ParticipService.prototype.getData = function () {
        return this.data;
    };
    ParticipService.prototype.addData = function (surname, name) {
        this.data.push(new particip_1.Particip(surname, name));
    };
    return ParticipService;
}());
exports.ParticipService = ParticipService;
//# sourceMappingURL=particip.service.js.map