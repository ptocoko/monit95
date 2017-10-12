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
var rsur_test_service_1 = require("../rsur-test/rsur-test.service");
var RsurParticipMarks = (function () {
    function RsurParticipMarks() {
    }
    return RsurParticipMarks;
}());
exports.RsurParticipMarks = RsurParticipMarks;
var RsurTestProtocolListComponent = (function () {
    function RsurTestProtocolListComponent(marksService, route, router, rsurTestService) {
        this.marksService = marksService;
        this.route = route;
        this.router = router;
        this.rsurTestService = rsurTestService;
        this.participsWithoutMarks = 0;
    }
    RsurTestProtocolListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.route.params.subscribe(function (params) {
            var rsurTestId = params['id'];
            _this.rsurTestService.getTestName(rsurTestId).subscribe(function (res) { return _this.testNumberCodeWithName = res.json(); });
            _this.marksService.getRsurMarksByRsurTestId(rsurTestId).subscribe(function (res) {
                _this.rsurParticips = res.json();
                _this.participsWithoutMarks = _this.rsurParticips.filter(function (f) { return !f.Marks; }).length;
                _this.isLoading = false;
            });
        });
    };
    RsurTestProtocolListComponent.prototype.changeMarks = function (participTestId) {
        this.router.navigate(['/rsur/testprotocols', participTestId]);
    };
    return RsurTestProtocolListComponent;
}());
RsurTestProtocolListComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/rsur/rsur-test-protocol/rsur-test-protocol-list.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [marks_service_1.MarksService,
        router_1.ActivatedRoute,
        router_1.Router,
        rsur_test_service_1.RsurTestService])
], RsurTestProtocolListComponent);
exports.RsurTestProtocolListComponent = RsurTestProtocolListComponent;
//# sourceMappingURL=rsur-test-protocol-list.component.js.map