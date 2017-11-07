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
var file_service_1 = require("./file.service");
var File = (function () {
    function File() {
    }
    return File;
}());
exports.File = File;
var RsurParticipComponent = (function () {
    function RsurParticipComponent(fileService) {
        this.fileService = fileService;
        this.files = [];
    }
    RsurParticipComponent.prototype.ngOnInit = function () {
        this.getAllFiles();
    };
    RsurParticipComponent.prototype.getAllFiles = function () {
        var _this = this;
        this.fileService.getAll()
            .subscribe(function (response) {
            _this.files = response.json();
        });
    };
    return RsurParticipComponent;
}());
RsurParticipComponent = __decorate([
    core_1.Component({
        selector: 'file',
        templateUrl: "./app/file/file.component.html?v=" + new Date().getTime(),
    }),
    __metadata("design:paramtypes", [file_service_1.FileService])
], RsurParticipComponent);
exports.RsurParticipComponent = RsurParticipComponent;
;
//# sourceMappingURL=files.component.js.map