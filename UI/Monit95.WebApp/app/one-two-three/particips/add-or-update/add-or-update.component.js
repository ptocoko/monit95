"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var particips_service_1 = require("../../../services/one-two-three/particips.service");
var router_1 = require("@angular/router");
var class_service_1 = require("../../../services/class.service");
var AddOrUpdateComponent = /** @class */ (function () {
    function AddOrUpdateComponent(participService, classService, router, route) {
        this.participService = participService;
        this.classService = classService;
        this.router = router;
        this.route = route;
        this.isUpdate = true;
    }
    AddOrUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.isUpdate = params['participId'];
            if (_this.isUpdate) {
                _this.participService.get(params['participId']).subscribe(function (res) { return _this.particip = res; });
            }
            else {
                _this.particip = {};
            }
            _this.classService.getClasses().subscribe(function (res) { return _this.classes = res.slice(0, 35); });
        });
    };
    AddOrUpdateComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/one-two-three/particips/add-or-update/add-or-update.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/one-two-three/particips/add-or-update/add-or-update.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [particips_service_1.ParticipService,
            class_service_1.ClassService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], AddOrUpdateComponent);
    return AddOrUpdateComponent;
}());
exports.AddOrUpdateComponent = AddOrUpdateComponent;
//# sourceMappingURL=add-or-update.component.js.map