"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
        this.marksProtocolUrl = '/api/rsur/marksProtocols';
        this.scansUrl = '/api/rsur/scans';
    }
    RsurProtocolsService.prototype.sortFunc = function (first, second) {
        if (first.Order < second.Order) {
            return -1;
        }
        else {
            return 1;
        }
    };
    RsurProtocolsService.prototype.getMarksProtocol = function (participCode) {
        if (participCode == 12345) {
            particip.QuestionResults.sort(this.sortFunc);
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
        //return this.http.get<MarksProtocol>(this.url).map(s => {
        //	s.QuestionResults.sort(this.sortFunc);
        //	return s;
        //});
    };
    RsurProtocolsService.prototype.getMarksProtocolByFileId = function (fileId) {
        var _this = this;
        //if (fileId === 6431) {
        //	return Observable.of(particip).delay(1000);
        //}
        //else {
        //	return Observable.of(null).delay(500);
        //}
        return this.http.get('/api/ExcelFiles/Upload').map(function (res) {
            var marksProtocol = res;
            if (marksProtocol) {
                marksProtocol.QuestionResults.sort(_this.sortFunc);
                return marksProtocol;
            }
            else {
                return null;
            }
        });
    };
    RsurProtocolsService.prototype.postMarksProtocol = function (marksProtocol) {
        if (!marksProtocol.FileId) {
            console.error('need to attach fileId to the marksProtocol object');
            return Observable_1.Observable.throw('there is no fileId');
        }
        else {
            //return this.http.post(this.marksProtocolUrl, marksProtocol, { responseType: 'text' });
        }
    };
    RsurProtocolsService.prototype.getScan = function (fileId) {
        return Observable_1.Observable.of(protocolScanModel).delay(2000);
        //return this.http.get<Scan>(`${this.scansUrl}/${fileId}`);
    };
    RsurProtocolsService.prototype.getAnswerSheets = function () {
        return Observable_1.Observable.of(answerSheets).delay(2000);
        //return this.http.get<AnswerSheet[]>(`${this.scansUrl}`);
    };
    RsurProtocolsService.prototype.postScan = function (file) {
        var fakeUrl = '/api/ExcelFiles/Upload';
        var formData = new FormData();
        formData.append('image', file, file.name);
        var subject = new Subject_1.Subject();
        var req = new http_1.HttpRequest('POST', fakeUrl, formData, {
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
    RsurProtocolsService.prototype.deleteScan = function (fileId) {
        return Observable_1.Observable.of({}).delay(1000);
        //return this.http.delete(`${this.scansUrl}/${fileId}`);
    };
    RsurProtocolsService.prototype.deleteTestResult = function (participTestId) {
        return Observable_1.Observable.of({}).delay(1000);
    };
    return RsurProtocolsService;
}());
RsurProtocolsService = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
], RsurProtocolsService);
exports.RsurProtocolsService = RsurProtocolsService;
var protocolScanModel = {
    FileId: 123,
    Url: '/Images/rsur-scans/2090/1000/1.jpg',
    SourceName: 'IMG_0001_01.JPG'
};
var scans = [
    {
        SourceName: 'IMG_001.JPG',
        FileId: 1234
    },
    {
        SourceName: 'IMG_002.JPG',
        FileId: 1234
    },
];
var answerSheets = [
    {
        ParticipCode: 12345,
        TestName: '0104 — Речь && Языковые нормы && Выразительность речи',
        Marks: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0',
        SourceName: 'IMG_002.JPG',
        FileId: 1234
    },
    {
        ParticipCode: 54321,
        TestName: '0101 — Орфография',
        Marks: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0',
        SourceName: 'IMG_001.JPG',
        FileId: 4321
    },
    {
        SourceName: 'IMG_004.JPG',
        FileId: 6431
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