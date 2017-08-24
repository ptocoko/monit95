import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { ParticipService } from "../particips/particip.service";
import { UserModel } from "../user.model";
import { Modal, overlayConfigFactory } from "angular2-modal";
import { ExportExcelModal, ExportExcelModalData } from "./export-excel-modal.component";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";

@Component({
	templateUrl: './app/class-particips/class-particips-list.component.html'
})
export class ClassParticipsListComponent implements OnInit {
	constructor(private userService: UserService, private participService: ParticipService, private modal: Modal) {

	}

	ngOnInit() {
		this.userService.getAccount().subscribe(data => {
			let user = data.json() as UserModel;
			//TODO: Get first class particips
		})
	}

	exportParticips(event: any) {
		let file: File = event.target.files[0];
		if (file.name.split('.').pop() === 'xlsx') {
			//let formData: FormData = new FormData();
			//formData.append('uploadFile', file, file.name);

			this.modal.open(ExportExcelModal, overlayConfigFactory({file: file}, BSModalContext)).then(modal => {
				modal.result.then(result => {
					//TODO: realize update list of particips;
				})
			})
			//this.http.post('/api/ExcelFiles/Upload', formData).subscribe(res => {
			//	console.log(res.json());
			//})
		}
	}
}