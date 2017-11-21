//import { Component } from '@angular/core';
//import { Http, Response, ResponseContentType } from "@angular/http";
////import { BSModalContext, Modal } from 'angular2-modal/plugins/bootstrap';
////import { overlayConfigFactory } from 'angular2-modal';
//import { ExportExcelModal, ExportExcelModalData } from './export-excel-modal.component';
//import { ParticipService } from "../../particip.service";
//import { Router } from "@angular/router";

//@Component({
//	templateUrl: `./app/class-particips/excel-export/export-excel.component.html?v=${new Date().getTime()}`,
//	styles: [
//		`.fileUploader {
//				overflow: hidden;
//				position: relative;
//			}

//			.fileUploader [type=file] {
//				cursor: inherit;
//				display: block;
//				font-size: 999px;
//				filter: alpha(opacity=0);
//				min-height: 100%;
//				min-width: 100%;
//				opacity: 0;
//				position: absolute;
//				right: 0;
//				text-align: right;
//				top: 0;
//			}`
//	]

//})
//export class ClassParticipsExportExcelComponent {
//	constructor(private http: Http,
//				private modal: Modal,
//				private participService: ParticipService,
//				private router: Router) { }

//	exportParticips(event: any) {
//		let file: File = event.target.files[0];
//		if (file.name.split('.').pop() === 'xlsx') {
//			this.modal.open(ExportExcelModal, overlayConfigFactory({ file: file, size: 'lg' }, BSModalContext)).then(modal => {
//				modal.result.then(result => {
//					this.router.navigate(['/class-particips/list'])
//				});
//			}).catch(data => {
//				//console.log(data);
//			})
//		}
//		else {
//			alert('Неверный тип файла. Загрузите файл с расширением ".xlsx"');
//		}
//	}
	
//	downloadExcelTemplate() {
//		this.http.get('/api/ExcelFiles/GetExcelTemplate', { responseType: ResponseContentType.Blob }).subscribe(data => this.downloadFile(data));
//	}

//	downloadFile(data: Response) {
//		var a = document.createElement("a");
//		a.href = URL.createObjectURL(data.blob());
//		a.download = 'excel';
//		a.click();
//	}
//}