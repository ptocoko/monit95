import { Component, OnInit } from '@angular/core';
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { ModalComponent, DialogRef, CloseGuard } from "angular2-modal";
import { Http } from "@angular/http";

export class ExportExcelModalData extends BSModalContext {
	public file: File;
}

@Component({
	styles: [`
		.custom-modal-container {
			padding: 15px;
		}
	`],
	templateUrl: './app/class-particips/excel-export/export-excel-modal.component.html'
})
export class ExportExcelModal implements CloseGuard, ModalComponent<ExportExcelModalData>, OnInit {
	exportedFile: File;
	isExporting: boolean;
	exportResults: any;

	constructor(public dialog: DialogRef<ExportExcelModalData>, private http: Http) {
		this.exportedFile = dialog.context.file;
	}

	ngOnInit() {
		this.isExporting = true;
		let formData: FormData = new FormData();
		formData.append('uploadFile', this.exportedFile, this.exportedFile.name);

		this.http.post('/api/ExcelFiles/Upload', formData).subscribe(res => {
			this.exportResults = res.json();
			this.isExporting = false;
		})
	}
}