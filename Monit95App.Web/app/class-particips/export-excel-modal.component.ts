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
	template: `
		<div class="container-fluid custom-modal-container">
			<div *ngIf="isExporting" style="text-align:center;margin-top:30px;" class="row">
				<img style="display:inline-block;width:40px" src="./app/class-particips/Eclipse.gif"/>
				<h1 style="display:inline;margin-left:10px;vertical-align:middle;">Добавление участников...</h1>
			</div>
			<div *ngIf="!isExporting">
				<h2 style="text-align:center"><b>{{exportResults.CountOfAddedParticips}}</b> участников добавлено успешно!</h2>
				<br />
				<div class="col-xs-12" *ngIf="exportResults.HasRowsWithError">
					<div class="jumbotron">
						<h2>Внимание!</h2>
						<p>Данные из строк <b>{{exportResults.RowNumbersWithError?.join(', ')}}</b> содержат ошибки и не были добавлены в базу!</p>
					</div>
				</div>
				<hr />
				<div style="text-align:right">
					<button style="margin-right:20px" class="btn btn-primary" (click)="dialog.close()">Закрыть</button>
				</div>
			</div>
			<br />
		</div>
`
})
export class ExportExcelModal implements CloseGuard, ModalComponent<ExportExcelModalData>, OnInit {
	context: ExportExcelModalData;
	isExporting: boolean;
	exportResults: any;

	constructor(public dialog: DialogRef<ExportExcelModalData>, private http: Http) {
		this.context = dialog.context;
	}

	ngOnInit() {
		this.isExporting = true;
		let formData: FormData = new FormData();
		formData.append('uploadFile', this.context.file, this.context.file.name);

		this.http.post('/api/ExcelFiles/Upload', formData).subscribe(res => {
			this.exportResults = res.json();
			console.log(this.exportResults);

			

			this.isExporting = false;
		})
	}
}