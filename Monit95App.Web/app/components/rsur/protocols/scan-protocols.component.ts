
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RsurProtocolsService } from "../../../services/rsur-protocols.service";
import { HttpResponse } from "@angular/common/http";

@Component({
	selector: 'scan-protocols-component',
	templateUrl: `./app/components/rsur/protocols/scan-protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/scan-protocols.component.css?v=${new Date().getTime()}`]
})
export class ScanProtocolsComponent {
	scans: Scan[] = [];
	notMatchedScansCount: number = 0;
	displayedColumns = ['id', 'sourceName', 'fileId', 'uploadProgress'];
	dataSource = new MatTableDataSource();
	
	constructor(private rsurProtocolsService: RsurProtocolsService) {

	}

	getNotMatchedCount() {
		this.notMatchedScansCount = this.scans.filter(s => s.fileId).length;
	}

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
					fileContent: file,
					fileId: null,
					status: 'isUploading'
				};

				this.scans.push(scan);
				this.uploadScan(scan);
			}
			this.dataSource = new MatTableDataSource(this.scans);
		}
		event.target.value = '';
	}

	uploadScan(scan: Scan) {
		scan.status = 'isUploading';
		this.rsurProtocolsService.postScan(scan.fileContent).subscribe(
			response => this.responseHandler(response, scan),
			error => this.errorResponseHandler(error, scan),
			() => scan.status = 'isComplete'
		);
	}

	responseHandler(res: number | HttpResponse<number>, scan: Scan) {
		if (res instanceof HttpResponse) {
			scan.fileId = res.body;
		}
		else {
			scan.uploadProgress = res;
		}
		this.getNotMatchedCount();
	}

	errorResponseHandler(error: any, scan: Scan) {
		scan.status = 'isFailed'
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
}

interface Scan {
	id: number;
	sourceName: string;
	size: number;
	uploadProgress: number;
	fileContent: File;
	fileId: number;
	status: 'isUploading' | 'isFailed' | 'isComplete';
}