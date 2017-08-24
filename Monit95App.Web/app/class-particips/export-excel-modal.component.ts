import { Component, OnInit } from '@angular/core';
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { ModalComponent, DialogRef } from "angular2-modal";
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
	template: `
		<div class="container-fluid custom-modal-container">
			<div *ngIf="isExporting">
				<h3>Exporting...</h3>
			</div>
			<div *ngIf="!isExporting">
				<h3>Exported!</h3>
			</div>
			<hr />
			<br />
		</div>
`
})
export class ExportExcelModal implements ModalComponent<ExportExcelModalData>, OnInit {
	context: ExportExcelModalData;
	isExporting: boolean;

	constructor(public dialog: DialogRef<ExportExcelModalData>, private http: Http) {
		this.context = dialog.context;

		this.isExporting = true;
		let formData: FormData = new FormData();
		formData.append('uploadFile', this.context.file, this.context.file.name);

		this.http.post('/api/ExcelFiles/Upload', formData).subscribe(res => {
			console.log(res.json());
			this.isExporting = false;
		})
	}

	ngOnInit() {
		
	}
}