import { Component } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { AccountService } from '../../../services/account.service';
import { getFileExtension } from '../../../utils/functions';

const REPOSITORY_ID = 4;
const TEST_CODE = '0201';

@Component({
	templateUrl: `./app/components/two-three/home/home.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/two-three/home/home.component.css?v=${new Date().getTime()}`]
})
export class HomeComponent {
	uploadStatus: 'waiting' | 'uploading' | 'uploaded' = 'waiting';

	constructor(private fileService: FileService,
		private accountService: AccountService) { }

	uploadXlsx(evt: any) {
		const file: File = evt.target.files[0];
		if (validateFile(file)) {
			const fileName = this.getFileName(file);
			this.uploadStatus = 'uploading';
			this.fileService.uploadFile(REPOSITORY_ID, file, fileName, false).subscribe(() => this.uploadStatus = 'uploaded');
		}
		evt.target.value = '';
	}

	private getFileName(file: File) {
        return `${TEST_CODE}_${this.accountService.account.UserName}.${getFileExtension(file.name)}`;
    }
}

function validateFile(file: File): boolean {
	if (getFileExtension(file.name) !== 'xlsx') {
		alert('Неподдерживаемы тип файла! ' + file.name);
		return false;
	}

	return true;
}
