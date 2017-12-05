
import { Component, OnInit, Pipe, PipeTransform, IterableDiffers, IterableDiffer, KeyValueDiffers } from '@angular/core';
import { RsurProtocolsService } from "../../../services/rsur-protocols.service";
import { HttpResponse } from "@angular/common/http";
import { Scan, AnswerSheet } from "../../../models/scan.model";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Component({
	selector: 'scan-protocols-component',
	templateUrl: `./app/components/rsur/protocols/scan-protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/scan-protocols.component.css?v=${new Date().getTime()}`]
})
export class ScanProtocolsComponent implements OnInit{
	answerSheets: AnswerSheetForUpload[] = [];

	notMatchedScansCount: number = 0;
	duplicatesCount: number = 0;
	failedScansCount: number = 0;

	isPageLoading: boolean = false;
	isScansUploading: boolean = false;

	iterableDiffer: IterableDiffer<any>;
	objDiffer: any;

	constructor(private rsurProtocolsService: RsurProtocolsService,
				private _iterableDiffers: IterableDiffers,
				private differs: KeyValueDiffers) // IterableDiffers и KeyValueDiffers — встроенные в Angular детекторы 
	{												//изменений состояния массивов и объектов соответственно (https://goo.gl/PVPKnU)

		//подготовка для отслеживания изменения массива
		this.iterableDiffer = _iterableDiffers.find([]).create(null);
	}

	ngOnInit() {
		this.objDiffer = {};
		this.isPageLoading = true;
		this.rsurProtocolsService.getAnswerSheets().subscribe(res => {
			this.answerSheets = res;
			this.isPageLoading = false;

			//подготовка differ'а для отслеживания изменений внутри объектов массива
			this.answerSheets.forEach((elt: any) => {
				this.objDiffer[elt] = this.differs.find(elt).create();
			});
		});
	}

	//ngDoCheck — часть жизненного цикла Angular (https://goo.gl/jBuc6s)
	ngDoCheck() {

		//если выявлены изменения в массиве или внутри объектов массива, то выполняется обновление статистических показателей
		let isChanged: boolean = false;
		let changes = this.iterableDiffer.diff(this.answerSheets);
		if (changes) {
			isChanged = true;
		}

		this.answerSheets.forEach((elt: any) => {
			var objDiffer = this.objDiffer[elt];
			var objChanges = objDiffer.diff(elt);
			if (objChanges) {
				isChanged = true;
			}
		});

		if (isChanged) {
			this.isScansUploading = this.answerSheets.filter(f => f.Status === 'isUploading').length > 0;
			this.getStats();
		}
	}

	getStats() {
		this.notMatchedScansCount = this.answerSheets.filter(s => s.FileId).length;
		this.failedScansCount = this.answerSheets.filter(s => s.Status === 'isFailed').length;
	}

	addPhoto(event: any) {
		let files: FileList = event.target.files;

		if (this.validateSelectedPhotos(files)) {
			for (let i = 0; i < files.length; i++)
			{
				let file = files[i];

				let answerSheet: AnswerSheetForUpload = {
					SourceName: file.name,
					UploadProgress: 0,
					FileContent: file,
					FileId: null,
					Status: 'isUploading'
				};

				this.answerSheets.push(answerSheet);
				this.uploadScan(answerSheet);
			}
		}
		event.target.value = '';
	}

	uploadScan(answerSheet: AnswerSheetForUpload) {
		answerSheet.Status = 'isUploading';
		this.isScansUploading = true;
		this.rsurProtocolsService.postScan(answerSheet.FileContent).subscribe(
			response => this.responseHandler(response, answerSheet),
			error => this.errorResponseHandler(error, answerSheet),
			() => answerSheet.Status = 'isComplete'
		);
	}

	responseHandler(res: number | HttpResponse<number>, answerSheet: AnswerSheetForUpload) {
		if (res instanceof HttpResponse) { //запрос возвращает сначала статус загрузки в процентах, а после загрузки FileId
			answerSheet.FileId = res.body;        //этот кусок кода для того чтобы отличить FileId от процента загрузки файла

			answerSheet.FileContent = null;//очищаем FileContent после отправки чтобы не забивать оперативную память
		}
		else {
			answerSheet.UploadProgress = res;
		}
	}

	errorResponseHandler(error: any, answerSheet: AnswerSheetForUpload) {
		if (error.status && error.status === 409) { //если ошибка имеет код 409 отмечаем файл как дубликат, т.е. убираем из списка
			let duplicatedScanIndex = this.answerSheets.indexOf(answerSheet);
			this.answerSheets.splice(duplicatedScanIndex, 1);
			
			this.duplicatesCount += 1;
		}
		else {
			answerSheet.Status = 'isFailed';
			this.failedScansCount += 1;
		}
	}

	deleteScan(answerSheet: AnswerSheetForUpload) {
		let statusBeforeDeleting = answerSheet.Status;
		answerSheet.Status = 'isDeleting';
		if (statusBeforeDeleting !== 'isFailed') {
			this.rsurProtocolsService.deleteScan(answerSheet.FileId).subscribe(
				res => this.answerSheets.splice(this.answerSheets.indexOf(answerSheet), 1),
				error => {
					let message = error.message ? error.message : error;
					alert(message);
					console.error(error);
					answerSheet.Status = statusBeforeDeleting;
				});
		}
		else {
			this.answerSheets.splice(this.answerSheets.indexOf(answerSheet), 1);
		}
	}

	reuploadScan(scan: AnswerSheetForUpload) {
		this.uploadScan(scan);
	}

	validateSelectedPhotos(files: FileList): boolean { //проверяем каждый загружаемый файл
		for (var i = 0; i < files.length; i++) {
			if (files[i].size / 1024 / 1024 > 15) {
				alert('Размер файла ' + files[i].name + ' превышает максимально разрешенный. \nМаксимально разрешенный размер файла — 10 МБ')
				return false;
			}
			if (['png', 'jpg', 'jpeg', 'tiff', 'tif'].indexOf(files[i].name.split('.').pop().toLowerCase()) === -1) {
				alert('Файл ' + files[i].name + ' имеет неразрешенный формат.\nРазрешены следующие форматы файлов: .png, .jpg, .jpeg, .tiff, .tif');
				return false;
			}
		}
		return true;
	}
}

interface AnswerSheetForUpload extends AnswerSheet {
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
		if (array && array.length > 1) {
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
		}
		return array;
	}
}