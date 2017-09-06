﻿import { Component, OnInit } from '@angular/core';
import { AccountService } from "../account/account.service";
import { Account } from "../account/account";
import { overlayConfigFactory } from "angular2-modal";
import { ExportExcelModal, ExportExcelModalData } from "./export-excel-modal.component";
import { BSModalContext, Modal } from "angular2-modal/plugins/bootstrap";
import { AddClassParticipModal } from "./add-class-particip.modal";
import { ParticipModel } from "../particip.model";
import { ParticipService } from "../particip.service";
import { MarksService } from "../rsur/marks/marks.service";

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
	isLoading: boolean = true;

	constructor(private userService: AccountService,
				private modal: Modal,
				private participService: ParticipService,
				private marksService: MarksService) {

	}

	ngOnInit() {
		this.userService.getAccount().subscribe(data => {
			this.account = data.json() as Account;
			this.participService.getAll(1).subscribe(res => {
				this.classParticips = res;
				this.isLoading = false;
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
					console.log(classParticip);
					this.classParticips.push(classParticip);
				}
			})
		});
		
	}

	updateClassParticip(classParticip: ParticipModel) {
		let index = this.classParticips.indexOf(classParticip);
		this.modal.open(AddClassParticipModal, overlayConfigFactory({
			isUpdate: true,
			schoolId: this.account.UserName,
			particip: Object.assign({}, classParticip)
		}, BSModalContext))
			.then(dialog => {
			dialog.result.then(changedParticip => {
				if (changedParticip) {
					this.classParticips[index] = changedParticip;
				}
			})
		});
	}

	deleteClassParticip(particip: ParticipModel) {
		let index = this.classParticips.indexOf(particip);
		this.modal.confirm()
			.title("Вы уверены, что хотите удалить данную запись?")
			.body("Это действие нельзя будет отменить")
			.open()
			.then(dialog => {
				dialog.result.then(res => {
					this.participService.deleteParticip(particip.Id).subscribe(res => {
						this.classParticips.splice(index, 1);
					})
				}).catch(() => {

				})
			});
	}

	sayHello(index: any) {
		return "Hello " + index;
	}
}