import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { UserModel } from "../user.model";
import { Modal, overlayConfigFactory, DialogRef } from "angular2-modal";
import { ExportExcelModal, ExportExcelModalData } from "./export-excel-modal.component";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { AddClassParticipModal } from "./add-class-particip.modal";
import { ParticipModel } from "../particip.model";
import { ParticipService } from "../particip.service";

@Component({
	templateUrl: './app/class-particips/class-particips-list.component.html',
	styles: [
		  `.fileUploader {
				overflow: hidden;
				position: relative;
			}

			.fileUploader [type=file] {
				cursor: inherit;
				display: block;
				font-size: 999px;
				filter: alpha(opacity=0);
				min-height: 100%;
				min-width: 100%;
				opacity: 0;
				position: absolute;
				right: 0;
				text-align: right;
				top: 0;
			}`
	]
})
export class ClassParticipsListComponent implements OnInit {
	classParticips: ParticipModel[];
	user: UserModel;

	constructor(private userService: UserService, private modal: Modal, private participService: ParticipService) {

	}

	ngOnInit() {
		this.userService.getAccount().subscribe(data => {
			this.user = data.json() as UserModel;
			this.participService.getAll(1).subscribe(res => {
				console.log(res);
				this.classParticips = res;
			});
		});
	}

	exportParticips(event: any) {
		let file: File = event.target.files[0];
		if (file.name.split('.').pop() === 'xlsx') {
			this.modal.open(ExportExcelModal, overlayConfigFactory({file: file}, BSModalContext)).then(modal => {
				modal.result.then(result => {
					//TODO: realize update list of particips;
				}).catch(data => {
					//console.log(data);
				})
			})
		}
	}

	addClassParticip() {
		this.modal.open(AddClassParticipModal, overlayConfigFactory({ isUpdate: false, schoolId: this.user.userName, projectId: 1 }, BSModalContext)).then(dialog => {
			dialog.result.then(classParticip => {
				if (classParticip) {
					this.classParticips.push(classParticip);

					console.log(this.classParticips)
				}
			})
		});
		
	}

	updateClassParticip(classParticip: ParticipModel, index: number) {
		this.modal.open(AddClassParticipModal, overlayConfigFactory({ isUpdate: true, schoolId: this.user.userName, particip: classParticip }, BSModalContext)).then(dialog => {
			dialog.result.then(particip => {
				if (particip) {
					console.log(particip);

					this.classParticips[index] = particip;

					console.log(this.classParticips[index]);
				}
			})
		});
	}
}