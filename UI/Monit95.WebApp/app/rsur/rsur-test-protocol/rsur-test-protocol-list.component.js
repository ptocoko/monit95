"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var marks_service_1 = require("./marks.service");
var router_1 = require("@angular/router");
var rsur_test_service_1 = require("../rsur-test/rsur-test.service");
var RsurParticipMarks = /** @class */ (function () {
    function RsurParticipMarks() {
    }
    return RsurParticipMarks;
}());
exports.RsurParticipMarks = RsurParticipMarks;
var RsurTestProtocolListComponent = /** @class */ (function () {
    function RsurTestProtocolListComponent(marksService, rsurTestService, route, router) {
        this.marksService = marksService;
        this.rsurTestService = rsurTestService;
        this.route = route;
        this.router = router;
        this.participsWithoutMarks = 0;
    }
    RsurTestProtocolListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.route.params.subscribe(function (params) {
            var rsurTestId = params['id'];
            _this.rsurTestService.getTestName(rsurTestId).subscribe(function (res) { return _this.testNumberCodeWithName = res.json(); });
            _this.marksService.getRsurProtocols(rsurTestId).subscribe(function (res) {
                _this.rsurParticips = res.json();
                _this.participsWithoutMarks = _this.rsurParticips.filter(function (f) { return !f.RsurQuestionValues; }).length;
                _this.isLoading = false;
                $.ready.then(function () {
                    $('#searchInput').find('input').focus();
                    $('#searchInput').find('span').hide();
                });
            });
        });
    };
    RsurTestProtocolListComponent.prototype.changeMarks = function (participTestId) {
        this.router.navigate(['/rsur/testprotocols', participTestId]);
    };
    RsurTestProtocolListComponent.prototype.onSearchTextChange = function (event) {
        var _this = this;
        if (event.keyCode !== 13) {
            if (this.rsurParticips.filter(function (x) { return x.RsurParticipCode.toString().indexOf(_this.searchText) !== -1; }).length === 1) {
                $('#searchInput').find('input').keyup(function (event) {
                    if (event.keyCode === 13) {
                        _this.changeMarks(_this.rsurParticips.find(function (x) { return x.RsurParticipCode.toString().indexOf(_this.searchText) !== -1; }).RsurParticipTestId);
                    }
                });
                $('#searchInput').addClass('has-success');
                $('#searchInput').find('span').show();
            }
            else {
                $('#searchInput').find('input').keyup(function (event) { });
                $('#searchInput').removeClass('has-success');
                $('#searchInput').find('span').hide();
            }
        }
    };
    RsurTestProtocolListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/rsur/rsur-test-protocol/rsur-test-protocol-list.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [marks_service_1.MarksService,
            rsur_test_service_1.RsurTestService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], RsurTestProtocolListComponent);
    return RsurTestProtocolListComponent;
}());
exports.RsurTestProtocolListComponent = RsurTestProtocolListComponent;
//# sourceMappingURL=rsur-test-protocol-list.component.js.map