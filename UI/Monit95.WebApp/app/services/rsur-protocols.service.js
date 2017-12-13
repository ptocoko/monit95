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
var RsurProtocolsService = /** @class */ (function () {
    function RsurProtocolsService(http) {
        this.http = http;
        this.marksProtocolUrl = '/api/rsur/testResults';
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
    /**
     * Возвращает протокол по коду участника
     * @param participCode код участника
     * @returns Observable<MarksProtocol>
     */
    RsurProtocolsService.prototype.getMarksProtocol = function (participCode) {
        if (participCode == 12345) {
            particip.QuestionResults.sort(this.sortFunc);
            return Observable_1.Observable.of(tslib_1.__assign({}, particip)).delay(500);
        }
        else {
            var error_1;
            if (participCode == 12365)
                error_1 = {
                    message: 'i error that here'
                };
            else
                error_1 = {
                    message: 'sadfasdfa'
                };
            return new Observable_1.Observable(function (observer) {
                setTimeout(function () {
                    observer.error(error_1);
                }, 500);
            });
        }
        //return this.http.get<MarksProtocol>(this.url).map(s => {
        //	s.QuestionResults.sort(this.sortFunc);
        //	return s;
        //});
    };
    /**
     * Возвращает протокол по fileId
     * @param participCode код участника
     * @returns Observable<MarksProtocol>
     */
    RsurProtocolsService.prototype.getMarksProtocolByFileId = function (fileId) {
        if (fileId === 6431) {
            return Observable_1.Observable.of(tslib_1.__assign({}, particip)).delay(500);
        }
        else {
            return Observable_1.Observable.of(null).delay(500);
        }
        //return this.http.get('/api/ExcelFiles/Upload').map(res => {
        //	let marksProtocol = res as MarksProtocol;
        //	if (marksProtocol) {
        //		marksProtocol.QuestionResults.sort(this.sortFunc);
        //		return marksProtocol;
        //	}
        //	else {
        //		return null;
        //	}
        //});
    };
    RsurProtocolsService.prototype.getQuestionProtocols = function () {
        return this.http.get(this.marksProtocolUrl).map(function (s) {
            s.forEach(function (val) {
                if (val.RsurQuestionValues === 'wasnot')
                    val.RsurQuestionValues = 'отсутствовал';
            });
            return s;
        });
    };
    RsurProtocolsService.prototype.postMarksProtocol = function (marksProtocol) {
        console.log('im post your marks');
        return Observable_1.Observable.of(null).delay(500);
        //return this.http.post(this.marksProtocolUrl, marksProtocol, { responseType: 'text' });
    };
    RsurProtocolsService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put(this.marksProtocolUrl + "/" + participTestId + "/markAsAbsent", null, { responseType: 'text' });
    };
    RsurProtocolsService.prototype.getScan = function (fileId) {
        return Observable_1.Observable.of(protocolScanModel).delay(500);
        //return this.http.get<Scan>(`${this.scansUrl}/${fileId}`);
    };
    RsurProtocolsService.prototype.getAnswerSheets = function () {
        return Observable_1.Observable.of(answerSheets).delay(500);
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
    RsurProtocolsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], RsurProtocolsService);
    return RsurProtocolsService;
}());
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
        RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0',
        SourceName: 'IMG_002.JPG',
        FileId: 1234
    },
    {
        ParticipCode: 54321,
        TestName: '0101 — Орфография',
        RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0',
        SourceName: 'IMG_001.JPG',
        FileId: 4321
    },
    {
        SourceName: 'IMG_004.JPG',
        FileId: 6431
    },
];
var questionProtocols = [
    {
        ParticipCode: 12345,
        ParticipTestId: 1234,
        TestName: '0104 — Речь && Языковые нормы && Выразительность речи',
        RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0'
    },
    {
        ParticipCode: 54321,
        ParticipTestId: 4321,
        TestName: '0101 — Орфография',
        RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1'
    },
    {
        ParticipCode: 89906,
        ParticipTestId: 2435,
        TestName: '0104 — Речь && Языковые нормы && Выразительность речи',
        RsurQuestionValues: 'wasnot'
    },
    {
        ParticipCode: 23451,
        ParticipTestId: 9367,
        TestName: '0102 — Пунктуация'
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