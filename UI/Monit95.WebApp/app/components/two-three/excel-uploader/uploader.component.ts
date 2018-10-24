﻿import { Component, Input } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { AccountService } from '../../../services/account.service';
import { getFileExtension } from '../../../utils/functions';
import { SchoolCollectorService } from '../../../shared/school-collector.service';
import { stagger } from '@angular/core/src/animation/dsl';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

const REPOSITORY_ID = 4;

@Component({
	selector: 'app-excel-upload',
	templateUrl: `./app/components/two-three/excel-uploader/uploader.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/two-three/excel-uploader/uploader.component.css?v=${new Date().getTime()}`]
})
export class ExcelUploadComponent {
	uploadStatus: 'waiting' | 'uploading' | 'uploaded' = 'waiting';
	uploadedFileId: number;

	@Input('testCode') testCode: string;
	@Input('collectorId') collectorId: number;

	constructor(private fileService: FileService,
		private accountService: AccountService,
		private collectorService: SchoolCollectorService,
		private dialog: MatDialog) { }

	ngOnInit() {
		this.collectorService.getSchoolCollectorState(this.collectorId).subscribe(state => {
			if (state.IsFinished) {
				this.uploadStatus = 'uploaded';
			}
		});
	}

	uploadXlsx(evt: any) {
		const file: File = evt.target.files[0];

		if (validateFile(file)) {
			const fileName = this.getFileName(file);

			this.uploadStatus = 'uploading';
			this.fileService.uploadFile(REPOSITORY_ID, file, fileName, false)
				.subscribe(fileId => {
					this.uploadedFileId = Number.parseInt(fileId);
					this.collectorService.isFinished(this.collectorId, true).subscribe(() => this.uploadStatus = 'uploaded');
				},
				error => {
					if (error.status === 409) {
						alert(JSON.parse(error.error).Message);
					} else {
						throw error;
					}
					this.uploadStatus = 'waiting';
				});
		}
		evt.target.value = '';
	}

	//cancelUploaded() {
	//	if (this.uploadedFileId) {
	//		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
	//			width: '400px',
	//			disableClose: true,
	//			data: { message: 'Вы действительно хотите удалить отправленный протокол проверки заданий?' }
	//		});

	//		dialogRef.afterClosed().subscribe(res => {
	//			if (res) {
	//				this.fileService.deleteFile(this.uploadedFileId).subscribe(() => {
	//					this.collectorService.isFinished(this.collectorId, false).subscribe(() => this.uploadStatus = 'waiting');
	//				});
	//			}
	//		});
	//	}
	//}

	private getFileName(file: File) {
		return `${this.testCode}_${this.accountService.account.UserName}.${getFileExtension(file.name)}`;
	}
}

function validateFile(file: File): boolean {
	if (getFileExtension(file.name) !== 'xlsx') {
		alert('Неподдерживаемы тип файла! ' + file.name);
		return false;
	}

	return true;
}