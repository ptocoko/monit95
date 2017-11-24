
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RsurProtocolsService } from "../../../services/rsur-protocols.service";

@Component({
	selector: 'scan-protocols-component',
	templateUrl: `./app/components/rsur/protocols/scan-protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/scan-protocols.component.css?v=${new Date().getTime()}`]
})
export class ScanProtocolsComponent {
	//scans: File[] = [];
	scans: Scan[] = [];

	displayedColumns = ['id', 'sourceName', 'size', 'uploadProgress'];
	dataSource = new MatTableDataSource();
	ScanStatus: ScanStatus;
	
	constructor(private rsurProtocolsService: RsurProtocolsService) { }

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;

	}

	addPhoto(event: any) {
		let files: FileList = event.target.files;

		if (this.validateSelectedPhotos(files)) {
			for (let i = 0; i < files.length; i++)
			{
				let file = files[i];

				let scan: Scan = {
					id: this.scans.length + 1,
					sourceName: file.name,
					size: file.size,
					uploadProgress: 0,
					file,
					status: ScanStatus.isUploading
				};

				this.scans.push(scan);
				this.uploadScan(scan);
			}
			this.dataSource = new MatTableDataSource(this.scans);
		}
		event.target.value = '';
	}

	uploadScan(scan: Scan) {
		scan.status = ScanStatus.isUploading;
		this.rsurProtocolsService.postScan(scan.file).subscribe(
			progress => scan.uploadProgress = progress,
			error => scan.status = ScanStatus.isFailed,
			() => scan.status = ScanStatus.isComplete);
	}

	reuploadScan(scan: Scan) {
		this.uploadScan(scan);
	}

	validateSelectedPhotos(files: FileList): boolean {
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

	scanIsFailed(status: ScanStatus) {
		return status === ScanStatus.isFailed;
	}

	scanIsUploading(status: ScanStatus) {
		return status === ScanStatus.isUploading;
	}

	scanIsComplete(status: ScanStatus) {
		return status === ScanStatus.isComplete;
	}
}

interface Scan {
	id: number;
	sourceName: string;
	size: number;
	uploadProgress: number;
	file: File;
	status: ScanStatus;
}

enum ScanStatus {
	isUploading,
	isFailed,
	isComplete
}