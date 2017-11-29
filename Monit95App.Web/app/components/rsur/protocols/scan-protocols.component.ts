
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { RsurProtocolsService } from "../../../services/rsur-protocols.service";
import { HttpResponse } from "@angular/common/http";
import { Scan } from "../../../models/scan.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';
import { Subject } from "rxjs/Subject";

@Component({
	selector: 'scan-protocols-component',
	templateUrl: `./app/components/rsur/protocols/scan-protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/scan-protocols.component.css?v=${new Date().getTime()}`]
})
export class ScanProtocolsComponent implements OnInit{
	scans: ScanForUpload[] = [];

	notMatchedScansCount: number = 0;
	duplicatesCount: number = 0;
	failedScansCount: number = 0;

	isPageLoading: boolean = false;
	isScansUploading: boolean = false;

	constructor(private rsurProtocolsService: RsurProtocolsService) { }

	ngOnInit() {
		this.isPageLoading = true;
		this.rsurProtocolsService.getNotMatchedScans().subscribe(res => {
			this.scans = res;
			this.getStats();
			this.isPageLoading = false;
		});

		Observable.merge(this.scans).switchMap(() => new Subject().asObservable()).subscribe(() => console.log('eee i do it!'))
	}

	getStats() {
		this.notMatchedScansCount = this.scans.filter(s => s.FileId).length;
		this.failedScansCount = this.scans.filter(s => s.Status === 'isFailed').length;
	}

	addPhoto(event: any) {
		let files: FileList = event.target.files;

		if (this.validateSelectedPhotos(files)) {
			for (let i = 0; i < files.length; i++)
			{
				let file = files[i];

				let scan: ScanForUpload = {
					SourceName: file.name,
					UploadProgress: 0,
					FileContent: file,
					FileId: null,
					Status: 'isUploading'
				};

				this.scans.push(scan);
				this.uploadScan(scan);
			}
		}
		event.target.value = '';
	}

	uploadScan(scan: ScanForUpload) {
		scan.Status = 'isUploading';
		this.isScansUploading = true;
		this.rsurProtocolsService.postScan(scan.FileContent).subscribe(
			response => this.responseHandler(response, scan),
			error => this.errorResponseHandler(error, scan),
			() => scan.Status = 'isComplete'
		);
	}

	responseHandler(res: number | HttpResponse<number>, scan: ScanForUpload) {
		if (res instanceof HttpResponse) { //запрос возвращает сначала статус загрузки в процентах, а после загрузки FileId
			scan.FileId = res.body;        //этот кусок кода для того чтобы отличить FileId от процента загрузки файла
		}
		else {
			scan.UploadProgress = res;
		}
		this.getStats();
	}

	errorResponseHandler(error: any, scan: ScanForUpload) {
		if (error.status && error.status === 409) { //если ошибка имеет код 409 отмечаем файл как дубликат, т.е. убираем из списка
			let duplicatedScanIndex = this.scans.indexOf(scan);
			this.scans.splice(duplicatedScanIndex, 1);
			
			this.duplicatesCount += 1;
		}
		else {
			scan.Status = 'isFailed';
			this.failedScansCount += 1;
		}
	}

	deleteScan(scan: ScanForUpload) {
		let statusBeforeDeleting = scan.Status;
		scan.Status = 'isDeleting';
		if (statusBeforeDeleting !== 'isFailed') {
			this.rsurProtocolsService.deleteScan(scan.FileId).subscribe(res => {
				this.scans.splice(this.scans.indexOf(scan), 1);
				this.getStats();
			},
			error => {
				let message = error.message ? error.message : error;
				alert(message);
				console.error(error);
				scan.Status = statusBeforeDeleting;
				this.getStats();
			})
		}
		else {
			this.scans.splice(this.scans.indexOf(scan), 1);
			this.getStats();
		}
	}

	reuploadScan(scan: ScanForUpload) {
		this.uploadScan(scan);
	}

	validateSelectedPhotos(files: FileList): boolean { //проверяем каждый загружаемый файл
		for (var i = 0; i < files.length; i++) {
			if (files[i].size / 1024 / 1024 > 15) {
				alert('Размер файла ' + files[i].name + ' превышает максимально разрешенный. \nМаксимально разрешенный размер файла — 10 МБ')
				return false;
			}
			if (['png', 'jpg', 'jpeg'].indexOf(files[i].name.split('.').pop().toLowerCase()) === -1) {
				alert('Файл ' + files[i].name + ' имеет неразрешенный формат.\nРазрешены следующие форматы файлов: .png, .jpg, .jpeg');
				return false;
			}
		}
		return true;
	}
}

interface ScanForUpload extends Scan {
	UploadProgress?: number;
	Status?: 'isComplete' | 'isUploading' | 'isFailed' | 'isDeleting';
	FileContent?: File;
}

//попытка сделать один общий фильтр pipe
@Pipe({
	name: 'filter',
	pure: false
})
export class FilterPipe implements PipeTransform {
	transform(array: any[], searchObj: {}) {
		for (let key in searchObj) {
			
			if (searchObj[key] && typeof searchObj[key] === 'string') {
				let searchString: string = searchObj[key].toLowerCase().toString();

				array = array.filter(f => {
					if (f[key] && typeof f[key] === 'string') {
						let value: string = f[key].toLowerCase().toString();

						return value.includes(searchString);
					}
				})
			}
		}

		return array;
	}
}