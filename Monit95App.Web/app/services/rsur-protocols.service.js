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
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/delay");
require("rxjs/add/observable/throw");
var Subject_1 = require("rxjs/Subject");
var RsurProtocolsService = (function () {
    function RsurProtocolsService(http) {
        this.http = http;
    }
    RsurProtocolsService.prototype.getScan = function (fileId) {
        return Observable_1.Observable.of(protocolScanModel).delay(2000);
    };
    RsurProtocolsService.prototype.getParticipTest = function (participCode) {
        if (participCode == 12345) {
            particip.QuestionResults.sort(function (first, second) {
                if (first.Order < second.Order) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            return Observable_1.Observable.of(particip).delay(2000);
        }
        else {
            var message_1;
            if (participCode == 12365)
                message_1 = 'i error that here';
            else
                message_1 = 'sadfasdfa';
            return new Observable_1.Observable(function (observer) {
                setTimeout(function () {
                    observer.error(message_1);
                }, 1500);
            });
        }
    };
    RsurProtocolsService.prototype.postScan = function (file) {
        var url = '/api/ExcelFiles/Upload';
        var formData = new FormData();
        formData.append('image', file, file.name);
        var subject = new Subject_1.Subject();
        var req = new http_1.HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'text'
        });
        this.http.request(req).subscribe(function (event) {
            if (event.type === http_1.HttpEventType.UploadProgress) {
                var percentDone = Math.round(100 * event.loaded / event.total);
                subject.next(percentDone);
            }
            else if (event instanceof http_1.HttpResponse) {
                subject.next(event);
                subject.complete();
            }
        }, function (error) { return subject.error(error); });
        return subject.asObservable();
    };
    RsurProtocolsService.prototype.getNotMatchedScans = function () {
        return Observable_1.Observable.of(scans).delay(2000);
    };
    return RsurProtocolsService;
}());
RsurProtocolsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], RsurProtocolsService);
exports.RsurProtocolsService = RsurProtocolsService;
var protocolScanModel = {
    FileId: 123,
    Url: '/Images/rsur-scans/2090/1000/1.jpg',
    FileName: 'IMG_0001_01.JPG',
    StillHasScans: false
};
var scans = [
    {
        Number: 1,
        SourceName: 'IMG_001.JPG',
        FileId: 1234
    },
    {
        Number: 2,
        SourceName: 'IMG_002.JPG',
        FileId: 1234
    },
];
var particip = {
    "ParticipCode": 12345,
    "ParticipTestId": 1234,
    "TestName": "0104 — Речь && Языковые нормы && Выразительность речи",
    "QuestionResults": [
        {
            "Name": "1.1",
            "Order": 1,
            "MaxMark": 4,
            "CurrentMark": null
        },
        {
            "Name": "3.2",
            "Order": 4,
            "MaxMark": 1,
            "CurrentMark": null
        },
        {
            "Name": "2.10",
            "Order": 2,
            "MaxMark": 1,
            "CurrentMark": null
        },
        {
            "Name": "3.1",
            "Order": 3,
            "MaxMark": 1,
            "CurrentMark": null
        }
    ]
};
//# sourceMappingURL=rsur-protocols.service.js.map