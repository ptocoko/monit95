import { Component } from '@angular/core';
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({	
	templateUrl: './create-form.component.html',
	styleUrls: ['./create-form.component.css']
})
export class SeminarReportCreateFormComponent {
	seminarFiles: IImageFile[] = [];
	readonly maxFileSize = 15728640; // 15 MB 
	fileIndex: number = 1; // используется для генерации уникальных ключей для файлов семинара
	isSending = false;
	acceptedImageExtensions = ['jpg', 'jpeg', 'png', 'bmp'];
	acceptedProtocolExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'tif', 'pdf', 'docx'];
	getNotProtocolFiles = () => this.seminarFiles.filter(f => f.isProtocol === false);
	getProtocolFiles = () => this.seminarFiles.filter(f => f.isProtocol === true);
	getFilesWithError = () => this.seminarFiles.filter(f => f.errorMessage);
	getFileFromKey = (key: string) => this.seminarFiles.find((val, i) => val.key === key);

	constructor(private readonly seminarReportService: SeminarReportService,
				private snackBar: MatSnackBar,
				private location: Location) { }
 
	async addFiles(event: any, isProtocol = false) {
		const files: FileList = event.target.files;
		if (this.validateFiles(files, isProtocol)) {
			for (let i = 0; i < files.length; i++) {
				let seminarFile: IImageFile = {
					// 
					key: isProtocol ? 'protocol' : `image_${this.fileIndex++}`,
					isProtocol: isProtocol,
					file: files[i],
					base64String: isProtocol ? undefined : await this.getBase64String(files[i])
				}
				this.seminarFiles.push(seminarFile);
			}
		}
		event.target.value = '';
	}

	getBase64String(file: File): Promise<string | ArrayBuffer> {
		return new Promise<string | ArrayBuffer>((resolve, reject) => {
			let fileReader = new FileReader();
			fileReader.onload = () => resolve(fileReader.result);
			fileReader.onerror = error => reject(error)
			fileReader.readAsDataURL(file);
		});
	}

	sendFiles() {
		this.isSending = true;
		let formData = new FormData();
		for (let seminarImage of this.seminarFiles) {
			formData.append(seminarImage.key, seminarImage.file, seminarImage.file.name);
		}

		this.seminarReportService.postFiles(formData).subscribe(
			response => {
				this.location.back();
			},
			error => {
				this.isSending = false;
				if (error.status !== 409) {
					throw Error(error.message);
				} else {
					this.filesConflictHandler(error.error);
				}
			}
		)
	}

	filesConflictHandler(error: any) {
		const keys = Object.keys(error.ModelState);
		for (const key of keys) {
			let currentFile = this.getFileFromKey(key);
			if (currentFile) {
				currentFile.errorMessage = error.ModelState[key][0];
			}
		}
	}

	cancel() {
		this.location.back();
	}

	remove(key: string) {
		const fileIndex = this.seminarFiles.indexOf(this.getFileFromKey(key));
        this.seminarFiles.splice(fileIndex, 1);
    }

	validateFiles(files: FileList, isProtocolFiles: boolean): boolean {
		const extensionsToCheck = isProtocolFiles ? this.acceptedProtocolExtensions : this.acceptedImageExtensions;

		for (let i = 0; i < files.length; i++) {
			if (extensionsToCheck.indexOf(getFileExtension(files[i].name)) < 0) {
				this.showMessage('неподдерживаемый тип файла: ' + files[i].name);
				return false;
			}
			if (files[i].size > this.maxFileSize) {
				this.showMessage(`размер файла ${files[i].name} превышает допустимое значение в 15 МБ`);
				return false;
			}
		}

		if (!isProtocolFiles) {
			if (files.length > 4 || this.getNotProtocolFiles().length + files.length > 4) {
				this.showMessage('максимально разрешенное количество фотографий — 4');
				return false;
			}
		} else {
			if (files.length > 1 || this.getProtocolFiles().length > 0) {
				this.showMessage('нельзя добавить больше одного файла протокола');
				return false;
			}
		}
		return true;
	}

	showMessage(message: string, actionText = 'OK') {
		this.snackBar.open(message, actionText, { duration: 3000 });
	}
}

function getFileExtension(name: string) {
	return name.split('.').pop().toLowerCase();
}

interface IImageFile {
    key: string;    
    errorMessage?: string;
    isProtocol: boolean;
    file: File;
	base64String?: string | ArrayBuffer; // ProtocolFile do not use this property
}