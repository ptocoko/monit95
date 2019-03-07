"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var particip_model_1 = require("../../../models/particip.model");
var particips_service_1 = require("../../../services/refactored/particips.service");
var account_service_1 = require("../../../services/account.service");
var router_1 = require("@angular/router");
var CLASSES = [
    {
        Id: '0900',
        Name: '9'
    },
    {
        Id: '1100',
        Name: '11'
    }
];
var AddComponent = /** @class */ (function () {
    function AddComponent(participsService, accountService, location, route) {
        this.participsService = participsService;
        this.accountService = accountService;
        this.location = location;
        this.route = route;
        this.particip = new particip_model_1.ParticipModel();
        this.availableClasses = [];
        this.isSending = false;
        this.isConflict = false;
    }
    AddComponent.prototype.ngOnInit = function () {
        this.projectId = this.route.snapshot.queryParams['projectId'];
        this.projectName = this.route.snapshot.queryParams['projectName'];
        this.availableClasses = CLASSES;
    };
    AddComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isSending = true;
        this.isConflict = false;
        // избавляемся от пробелов в начале и в конце
        this.particip.Surname = this.particip.Surname.trim();
        this.particip.Name = this.particip.Name.trim();
        if (this.particip.SecondName) {
            this.particip.SecondName = this.particip.SecondName.trim();
        }
        ;
        this.participsService.post(this.particip, this.projectId).subscribe(function (_) {
            _this.back();
        }, function (error) {
            _this.isSending = false;
            if (error.status === 409) {
                _this.isConflict = true;
            }
            else {
                throw error;
            }
        });
    };
    AddComponent.prototype.back = function () {
        this.location.back();
    };
    AddComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/particips/add/add.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/particips/add/add.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particips_service_1.ParticipsService,
            account_service_1.AccountService,
            common_1.Location,
            router_1.ActivatedRoute])
    ], AddComponent);
    return AddComponent;
}());
exports.AddComponent = AddComponent;
//# sourceMappingURL=add.component.js.map