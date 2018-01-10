﻿
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SeminarReportModel } from '../components/rsur/seminar-reports/shared/seminar-report.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SeminarReportService {
    readonly endpoint = 'api/rsur/seminarReports';

    constructor(private readonly http: HttpClient) { } 

	postFiles(formData: FormData) {
		//return this.http.post(this.endpoint, formData, { responseType: 'text' });
		const error = {
			status: 409,
			state: {
				'image_0': 'это дубликат',
				'image_3': 'эта фотка не оч',
				'protocol': 'prot не прот'
			}
		}
		return Observable.throw(error);
	}

    //// Отправка файл протокола
    //sendProtocol(reportId: number, protocolFile: File) {
    //    // Generate FormData
    //    const formData = new FormData();
    //    formData.append('protocolFile', protocolFile, protocolFile.name);

    //    // Generate request parameter
    //    let httpParams = new HttpParams();        
    //    httpParams = httpParams.append('isProtocol', 'true');
        
    //    return this.http.post(`${this.endpoint}/${reportId}/files`, formData, { params: httpParams });
    //}

    //// Отправка файлов фотографий
    //sendFotos(reportId: number, protocolFile: File) {
    //    // FormData
    //    const formData = new FormData();
    //    formData.append('protocolFile', protocolFile, protocolFile.name);

    //    // Request parameter
    //    let params = new HttpParams();
    //    params = params.append('isProtocol', 'true');

    //    return this.http.post(`${this.endpoint}/${reportId}/files`, formData, { params: params });
    //}

	postText(text: string) {
        return this.http.post(this.endpoint, { text });
	}

	postImages(images: File[], reportId: number) {
		const formData = new FormData();
		images.forEach((val, i, arr) => formData.append(`image${i}`, val, val.name));
        return this.http.post(`${this.endpoint}/${reportId}/files`, formData, { responseType: 'text' });
	}

	getReportsList() {
        return this.http.get<SeminarReportModel[]>(this.endpoint);
	}

	getReport(reportId: number) {
        return this.http.get<SeminarReportModel>(`${this.endpoint}/${reportId}`);
	}

	deleteReport(reportId: number) {
        return this.http.delete(`${this.endpoint}/${reportId}`, { responseType: 'text' });
	}
}
