import { Component } from '@angular/core';
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { MatSnackBar } from '@angular/material';

@Component({	
	templateUrl: `./app/components/rsur/seminar-reports/create-form/create-form.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/seminar-reports/create-form/create-form.component.css?v=${new Date().getTime()}`]
})
export class SeminarReportCreateFormComponent {
	seminarFiles: IImageFile[] = [];
	readonly maxFileSize = 15728640; // 15 MB 
	filesCount: number = 0; // используется для генерации уникальных ключей для файлов
	acceptedFileExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'pdf'];
	getNotProtocolFiles = () => this.seminarFiles.filter(f => f.isProtocol === false);
	getProtocolFiles = () => this.seminarFiles.filter(f => f.isProtocol === true);
	getFilesWithError = () => this.seminarFiles.filter(f => f.errorMessage);

	constructor(private readonly seminarReportService: SeminarReportService, private snackBar: MatSnackBar) { }
 
	async addFiles(event: any, isProtocol = false) {
		const files: FileList = event.target.files;
		if (this.validateFiles(files, isProtocol)) {
			for (let i = 0; i < files.length; i++) {
				let seminarFile: IImageFile = {
					// 
					key: isProtocol ? 'protocol' : `image_${this.filesCount++}`,
					isProtocol: isProtocol,
					file: files[i],
					base64String: isProtocol ? undefined : await this.getBase64String(files[i])
				}
				this.seminarFiles.push(seminarFile);
			}
			console.log(this.seminarFiles);
		}
		event.target.value = '';
	}

	getBase64String(file: File): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			let fileReader = new FileReader();
			fileReader.onload = () => resolve(fileReader.result);
			fileReader.onerror = error => reject(error.message)
			fileReader.readAsDataURL(file);
		});
	}

	sendFiles() {
		let formData = new FormData();
		for (let seminarImage of this.seminarFiles) {
			formData.append(seminarImage.key, seminarImage.file, seminarImage.file.name);
		}

		this.seminarReportService.postFiles(formData).subscribe(response => {
			console.log(response);
		},
		error => {
			if (error.status !== 409) {
				throw Error(error.error.Message);
			} else {
				this.filesConflictHandler(error);
			}
		})
	}

	filesConflictHandler(error: any) {
		const keys = Object.keys(error.state);
		for (const key of keys) {
			this.seminarFiles.find((val, i) => val.key === key).errorMessage = error.state[key];
		}
	}

    remove(key: string) {
        console.log(key);
        this.seminarFiles.splice(this.seminarFiles.indexOf(this.seminarFiles.find((val, i) => val.key === key)), 1);
    }

	validateFiles(files: FileList, isProtocolFiles: boolean): boolean {
		for (let i = 0; i < files.length; i++) {
			if (this.acceptedFileExtensions.indexOf(getFileExtension(files[i].name)) < 0) {
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
	base64String?: string; // ProtocolFile do not use this property
}