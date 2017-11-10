
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { SeminarReportService } from "../../../../../services/seminar-report.service";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BasicValidators } from "../../../../../shared/basic-validators";

@Component({
	selector: 'upload-report',
	templateUrl: `./app/components/rsur/seminar-reports/seminar-report/create-form/create-form.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/seminar-report/create-form/create-form.component.css?v=${new Date().getTime()}`]
})
export class CreateReportFormComponent implements OnInit {
	reportForm: FormGroup;
	images: File[] = new Array<File>();
	isSending: boolean = false;

	constructor(private readonly location: Location,
				private readonly seminarReportService: SeminarReportService,
				private readonly fb: FormBuilder) { }

	ngOnInit() {
		this.reportForm = this.fb.group({
			protocolText: ['', [Validators.required, BasicValidators.textMinLengthWithoutSpaces(100)]]
		});
	}

	addPhoto(event: any) {
		let files: FileList = event.target.files as FileList;
		if (this.validateSelectedPhotos(files)) {
			for (var i = 0; i < files.length; i++) {
				this.images.push(files[i]);
			}
		}
		event.target.value = '';
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
		if (this.reportForm.valid && this.images.length > 0) {
			this.isSending = true;
			this.seminarReportService.postText(this.reportForm.get('protocolText').value).subscribe((reportId: number) => {
				this.seminarReportService.postImages(this.images, reportId).subscribe(() => {
					this.isSending = false;
					this.location.back()
				})
			});
		}
	}

	cancel() {
		this.location.back();
	}
}
