"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var marks_service_1 = require("./marks.service");
var router_1 = require("@angular/router");
var RsurParticipMarks = (function () {
    function RsurParticipMarks() {
    }
    return RsurParticipMarks;
}());
exports.RsurParticipMarks = RsurParticipMarks;
var RsurMarksListComponent = (function () {
    function RsurMarksListComponent(marksService, route, router) {
        this.marksService = marksService;
        this.route = route;
        this.router = router;
        this.participsWithoutMarks = 0;
    }
    RsurMarksListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var rsurTestId = params['rsurTestId'];
            _this.marksService.getRsurMarksByRsurTestId(rsurTestId).subscribe(function (res) {
                _this.rsurParticips = res.json();
                _this.participsWithoutMarks = _this.rsurParticips.filter(function (f) { return !f.Marks; }).length;
            });
        });
    };
    RsurMarksListComponent.prototype.changeMarks = function (participTestId) {
        this.router.navigate(['/rsur/marks-edit', participTestId]);
    };
    return RsurMarksListComponent;
}());
RsurMarksListComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/rsur/marks/marks-list.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [marks_service_1.MarksService, router_1.ActivatedRoute, router_1.Router])
], RsurMarksListComponent);
exports.RsurMarksListComponent = RsurMarksListComponent;
//# sourceMappingURL=marks-list.component.js.map