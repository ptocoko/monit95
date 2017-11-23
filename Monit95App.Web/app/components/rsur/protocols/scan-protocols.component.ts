
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'scan-protocols-component',
	templateUrl: `./app/components/rsur/protocols/scan-protocols.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/components/rsur/protocols/scan-protocols.component.css?v=${new Date().getTime()}`]
})
export class ScanProtocolsComponent {
	scans: File[] = [];
	scansInfo: ScanInfo[] = [];

	displayedColumns = ['id', 'sourceName', 'size'];
	dataSource = new MatTableDataSource();

	constructor() { }

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	addPhoto(event: any) {
		let files: FileList = event.target.files;

		if (this.validateSelectedPhotos(files)) {
			for (let i = 0; i < files.length; i++)
			{
				let scanInfo: ScanInfo = {
					id: this.scans.length + 1,
					sourceName: files[i].name,
					size: files[i].size
				};

				this.scansInfo.push(scanInfo);
				this.scans.push(files[i]);
			}
			this.dataSource = new MatTableDataSource(this.scansInfo);
		}
		event.target.value = '';
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

interface ScanInfo {
	id: number;
	sourceName: string;
	size: number;
}