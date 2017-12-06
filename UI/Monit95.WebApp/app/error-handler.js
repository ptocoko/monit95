"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var GlobalErrorHandler = (function () {
    function GlobalErrorHandler() {
    }
    GlobalErrorHandler.prototype.handleError = function (error) {
        var message = error.message ? error.message : error.toString();
        console.error(message);
        alert('Ошибка! Обратитесь к администратору\n\n' + message);
        throw error;
    };
    return GlobalErrorHandler;
}());
GlobalErrorHandler = tslib_1.__decorate([
    core_1.Injectable()
], GlobalErrorHandler);
exports.GlobalErrorHandler = GlobalErrorHandler;
//# sourceMappingURL=error-handler.js.map