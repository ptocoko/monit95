import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
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
	account: Account;

    constructor(
        private readonly accountService: AccountService,
        private readonly modal: Modal,
        private readonly participService: ParticipService) {

	}

	ngOnInit() {
		this.accountService.getAccount().subscribe(data => {
			this.account = data.json() as Account;
			this.participService.getAll(1).subscribe(res => {
				this.classParticips = res;
			});
		});
	}

	exportParticips(event: any) {
		let file: File = event.target.files[0];
		if (file.name.split('.').pop() === 'xlsx') {
			this.modal.open(ExportExcelModal, overlayConfigFactory({file: file}, BSModalContext)).then(modal => {
				modal.result.then(result => {
					this.participService.getAll(1).subscribe(res => {
						this.classParticips = res;
					});
				}).catch(data => {
					//console.log(data);
				})
			})
		}
	}

	addClassParticip() {
		this.modal.open(AddClassParticipModal, overlayConfigFactory({ isUpdate: false, schoolId: this.account.UserName, projectId: 1 }, BSModalContext)).then(dialog => {
			dialog.result.then(classParticip => {
				if (classParticip) {
					this.classParticips.push(classParticip);
				}
			})
		});
		
	}

	updateClassParticip(classParticip: ParticipModel, index: number) {
		this.modal.open(AddClassParticipModal, overlayConfigFactory({ isUpdate: true, schoolId: this.account.UserName, particip: classParticip }, BSModalContext)).then(dialog => {
			dialog.result.then(particip => {
				if (particip) {
					this.classParticips[index] = particip;
				}
			})
		});
	}
}