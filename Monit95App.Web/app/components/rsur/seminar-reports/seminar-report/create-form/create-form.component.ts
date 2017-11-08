
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { RsurReportService } from '../../../../../services/rsur-report.service';
import { SeminarReportService } from '../../../../../services/seminar-report.service';

@Component({
	selector: 'upload-report',
	templateUrl: `./app/components/rsur/seminar-report/add-form/upload-report.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-report/add-form/upload-report.component.css?v=${new Date().getTime()}`]
})
export class UploadReportComponent {
	images: File[] = new Array<File>();
	protocolText: string = "";

	constructor(private readonly location: Location, private readonly seminarReportService: SeminarReportService) { }

	addPhoto(event: any) {
		let files: FileList = event.target.files as FileList;
		if (this.validateSelectedPhotos(files)) {
			for (var i = 0; i < files.length; i++) {
				this.images.push(files[i]);
			}
		}
	}

	validateSelectedPhotos(files: FileList): boolean {
		if (this.images.length + files.length > 4) {
			alert('Нельзя отправить больше четырех файлов!');
			return false;
		}
		for (var i = 0; i < files.length; i++) {
			if (files[i].size / 1024 / 1024 > 10) {
				alert('Размер файла ' + files[i].name + ' превышает максимально разрешенный. \nМаксимально разрешенный размер файла — 10 МБ')
				return false;
			}
			if (['png', 'jpg', 'jpeg'].indexOf(files[i].name.split('.').pop().toLowerCase()) === -1 ){
				alert('Файл ' + files[i].name + ' имеет неразрешенный формат.\nРазрешены следующие форматы файлов: .png, .jpg, .jpeg');
				return false;
			}
		}
		return true;
	}

	deletePhoto(image: File) {
		let index = this.images.indexOf(image);
		this.images.splice(index, 1);
	}

	send() {
		this.seminarReportService.postText(this.protocolText).subscribe((reportId: number) => {
			this.seminarReportService.postImages(this.images, reportId).subscribe(() => this.location.back())
		});
	}

	cancel() {
		this.location.back();
	}
}
