
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RsurProtocolsService } from "../../../services/rsur-protocols.service";
import { HttpResponse } from "@angular/common/http";
import { Scan } from "../../../models/scan.model";

@Component({
	selector: 'scan-protocols-component',
	templateUrl: `./app/components/rsur/protocols/scan-protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/scan-protocols.component.css?v=${new Date().getTime()}`]
})
export class ScanProtocolsComponent implements OnInit{
	scans: Scan[] = [];

	notMatchedScansCount: number = 0;
	duplicatesCount: number = 0;
	failedScansCount: number = 0;

	displayedColumns = ['id', 'sourceName', 'fileId', 'uploadProgress'];
	dataSource = new MatTableDataSource();
	
	constructor(private rsurProtocolsService: RsurProtocolsService) {
		
	}

	ngOnInit() {
		this.rsurProtocolsService.getNotMatchedScans().subscribe(res => {
			this.scans = res;
			this.dataSource = new MatTableDataSource(this.scans);
			this.getStats();
		});
	}

	getStats() {
		this.notMatchedScansCount = this.scans.filter(s => s.FileId).length;
		this.failedScansCount = this.scans.filter(s => s.Status === 'isFailed').length;
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
					SourceName: file.name,
					UploadProgress: 0,
					FileContent: file,
					FileId: null,
					Status: 'isUploading'
				};

				this.scans.push(scan);
				this.uploadScan(scan);
			}
			this.dataSource = new MatTableDataSource(this.scans);
		}
		event.target.value = '';
	}

	uploadScan(scan: Scan) {
		scan.Status = 'isUploading';
		this.rsurProtocolsService.postScan(scan.FileContent).subscribe(
			response => this.responseHandler(response, scan),
			error => this.errorResponseHandler(error, scan),
			() => scan.Status = 'isComplete'
		);
	}

	responseHandler(res: number | HttpResponse<number>, scan: Scan) {
		if (res instanceof HttpResponse) {
			scan.FileId = res.body;
		}
		else {
			scan.UploadProgress = res;
		}
		this.getStats();
	}

	errorResponseHandler(error: any, scan: Scan) {
		if (error.status && error.status === 409) {
			let duplicatedScanIndex = this.scans.indexOf(scan);
			this.scans.splice(duplicatedScanIndex, 1);

			this.dataSource = new MatTableDataSource(this.scans);
			this.duplicatesCount += 1;
		}
		else {
			scan.Status = 'isFailed';
			this.failedScansCount += 1;
		}
	}

	deleteScan(scan: Scan, elem: HTMLAnchorElement) {
		this.rsurProtocolsService.deleteScan(scan.FileId).subscribe(res => {
			this.scans.splice(this.scans.indexOf(scan), 1);
			this.getStats();
		})
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