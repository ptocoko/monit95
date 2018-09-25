import { Component, Input } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { AccountService } from '../../../services/account.service';
import { getFileExtension } from '../../../utils/functions';

const REPOSITORY_ID = 4;

@Component({
	selector: 'app-excel-upload',
	templateUrl: `./app/components/two-three/excel-uploader/uploader.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/two-three/excel-uploader/uploader.component.css?v=${new Date().getTime()}`]
})
export class ExcelUploadComponent {
	uploadStatus: 'waiting' | 'uploading' | 'uploaded' = 'waiting';

	@Input('testCode') testCode: string;

	constructor(private fileService: FileService,
		private accountService: AccountService) { }

	ngOnInit() {

	}

	uploadXlsx(evt: any) {
		const file: File = evt.target.files[0];

		if (validateFile(file)) {
			const fileName = this.getFileName(file);

			this.uploadStatus = 'uploading';
			this.fileService.uploadFile(REPOSITORY_ID, file, fileName, false)
				.subscribe(() => this.uploadStatus = 'uploaded',
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