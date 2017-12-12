
import { Component, OnInit, Pipe, PipeTransform, IterableDiffers, IterableDiffer, KeyValueDiffers, TemplateRef } from '@angular/core';
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { RsurProtocolsService } from '../../../../services/rsur-protocols.service';
import { AnswerSheet } from '../../../../models/scan.model';

@Component({
	selector: 'scan-protocols-component',
	templateUrl: `./app/components/rsur/protocols/scan/scan-protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/scan/scan-protocols.component.css?v=${new Date().getTime()}`]
})
export class ScanProtocolsComponent implements OnInit{
	answerSheets: AnswerSheetForUpload[] = [];

	allCompleteCount = () => this.answerSheets.filter(f => f.FileId).length;
	notMatchedCount = () => this.answerSheets.filter(s => !s.ParticipCode && (s.Status === 'isComplete' || !s.Status)).length;
	duplicatesCount: number;
	failsCount = () => this.answerSheets.filter(s => s.Status === 'isFailed').length;

	isPageLoading: boolean = false;

	iterableDiffer: IterableDiffer<any>;
	objDiffer: any;

	constructor(private rsurProtocolsService: RsurProtocolsService) { }

	ngOnInit() {
		this.isPageLoading = true;
		this.rsurProtocolsService.getAnswerSheets().subscribe(res => {
			this.answerSheets = res;
			this.isPageLoading = false;
		});
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
		}
	}

	//перед удалением бланка ответов проверяем, был ли он загружен на сервер
	//если файла нет на сервере то достаточно удалить его из массива
	deleteScan(answerSheet: AnswerSheetForUpload) {
		if (confirm('Вы уверены? \nЭто действие нельзя будет отменить'))
		{
			let statusBeforeDeleting = answerSheet.Status;
			answerSheet.Status = 'isDeleting';

			if (statusBeforeDeleting !== 'isFailed')
			{
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