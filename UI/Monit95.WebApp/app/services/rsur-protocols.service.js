var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { of as observableOf, Subject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";
var RsurProtocolsService = /** @class */ (function () {
    function RsurProtocolsService(http) {
        this.http = http;
        this.marksProtocolUrl = '/api/rsur/questionValues';
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
        var _this = this;
        return this.http.get(this.marksProtocolUrl + "/" + participCode).pipe(map(function (s) {
            s.QuestionResults.sort(_this.sortFunc);
            return s;
        }));
    };
    /**
     * Возвращает протокол по fileId
     * @param participCode код участника
     * @returns Observable<MarksProtocol>
     */
    RsurProtocolsService.prototype.getMarksProtocolByFileId = function (fileId) {
        //if (fileId === 6431) {
        //	return Observable.of({ ...particip }).delay(500);
        //}
        //else {
        //	return Observable.of(null).delay(500);
        //}
        return observableOf(null);
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
        return this.http.get(this.marksProtocolUrl).pipe(map(function (s) {
            s.forEach(function (val) {
                if (val.RsurQuestionValues === 'wasnot')
                    val.RsurQuestionValues = 'отсутствовал';
            });
            return s;
        }));
    };
    RsurProtocolsService.prototype.postMarksProtocol = function (marksProtocol) {
        return this.http.post(this.marksProtocolUrl, marksProtocol, { responseType: 'text' });
    };
    RsurProtocolsService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put(this.marksProtocolUrl + "/" + participTestId + "/markAsAbsent", null, { responseType: 'text' });
    };
    RsurProtocolsService.prototype.getStatistics = function () {
        return this.http.get(this.marksProtocolUrl + '/statistics', { responseType: 'text' });
    };
    RsurProtocolsService.prototype.getScan = function (fileId) {
        //return Observable.of(protocolScanModel).delay(500);
        return observableOf(null);
        //return this.http.get<Scan>(`${this.scansUrl}/${fileId}`);
    };
    RsurProtocolsService.prototype.getAnswerSheets = function () {
        //return Observable.of(answerSheets).delay(500);
        return observableOf(null);
        //return this.http.get<AnswerSheet[]>(`${this.scansUrl}`);
    };
    RsurProtocolsService.prototype.postScan = function (file) {
        var fakeUrl = '/api/ExcelFiles/Upload';
        var formData = new FormData();
        formData.append('image', file, file.name);
        var subject = new Subject();
        var req = new HttpRequest('POST', fakeUrl, formData, {
            reportProgress: true,
            responseType: 'text'
        });
        this.http.request(req).subscribe(function (event) {
            if (event.type === HttpEventType.UploadProgress) {
                var percentDone = Math.round(100 * event.loaded / event.total);
                subject.next(percentDone);
            }
            else if (event instanceof HttpResponse) {
                subject.next(event);
                subject.complete();
            }
        }, function (error) { return subject.error(error); });
        return subject.asObservable();
    };
    RsurProtocolsService.prototype.deleteScan = function (fileId) {
        return observableOf({}).pipe(delay(1000));
        //return this.http.delete(`${this.scansUrl}/${fileId}`);
    };
    RsurProtocolsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], RsurProtocolsService);
    return RsurProtocolsService;
}());
export { RsurProtocolsService };
//const protocolScanModel: Scan = {
//	FileId: 123,
//	Url: '/Images/rsur-scans/2090/1000/1.jpg',
//	SourceName: 'IMG_0001_01.JPG'
//};
//const scans: Scan[] = [
//	{
//		SourceName: 'IMG_001.JPG',
//		FileId: 1234
//	},
//	{
//		SourceName: 'IMG_002.JPG',
//		FileId: 1234
//	},
//]
//const answerSheets: AnswerSheet[] = [
//	{
//		ParticipCode: 12345,
//		TestName: '0104 — Речь && Языковые нормы && Выразительность речи',
//		RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0',
//		SourceName: 'IMG_002.JPG',
//		FileId: 1234
//	},
//	{
//		ParticipCode: 54321,
//		TestName: '0101 — Орфография',
//		RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0',
//		SourceName: 'IMG_001.JPG',
//		FileId: 4321
//	},
//	{
//		SourceName: 'IMG_004.JPG',
//		FileId: 6431
//	},
//]
//const questionProtocols: Protocol[] = [
//	{
//		ParticipCode: 12345,
//		ParticipTestId: 1234,
//		TestName: '0104 — Речь && Языковые нормы && Выразительность речи',
//		RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1;1;1;1;1;1;0;0;0'
//	},
//	{
//		ParticipCode: 54321,
//		ParticipTestId: 4321,
//		TestName: '0101 — Орфография',
//		RsurQuestionValues: '0;1;0;1;1;1;1;1;1;1;1;1;0;0;0;0;0;0;1'
//	},
//	{
//		ParticipCode: 89906,
//		ParticipTestId: 2435,
//		TestName: '0104 — Речь && Языковые нормы && Выразительность речи',
//		RsurQuestionValues: 'wasnot'
//	},
//	{
//		ParticipCode: 23451,
//		ParticipTestId: 9367,
//		TestName: '0102 — Пунктуация'
//	},
//]
//const particip: MarksProtocol = {
//	"ParticipCode": 12345,
//	"ParticipTestId": 1234,
//	"TestName": "0104 — Речь && Языковые нормы && Выразительность речи",
//	"QuestionResults": [
//		{
//			"Name": "1.1",
//			"Order": 1,
//			"MaxMark": 4,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.2",
//			"Order": 4,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "2.10",
//			"Order": 2,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.1",
//			"Order": 3,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.2",
//			"Order": 4,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "2.10",
//			"Order": 2,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.1",
//			"Order": 3,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.2",
//			"Order": 4,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "2.10",
//			"Order": 2,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.1",
//			"Order": 3,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.2",
//			"Order": 4,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "2.10",
//			"Order": 2,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.1",
//			"Order": 3,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.2",
//			"Order": 4,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "2.10",
//			"Order": 2,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.1",
//			"Order": 3,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.2",
//			"Order": 4,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "2.10",
//			"Order": 2,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.1",
//			"Order": 3,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.2",
//			"Order": 4,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "2.10",
//			"Order": 2,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.1",
//			"Order": 3,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.2",
//			"Order": 4,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "2.10",
//			"Order": 2,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.1",
//			"Order": 3,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.2",
//			"Order": 4,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "2.10",
//			"Order": 2,
//			"MaxMark": 1,
//			"CurrentMark": null
//		},
//		{
//			"Name": "3.1",
//			"Order": 3,
//			"MaxMark": 1,
//			"CurrentMark": null
//		}
//	]
//}
//# sourceMappingURL=rsur-protocols.service.js.map