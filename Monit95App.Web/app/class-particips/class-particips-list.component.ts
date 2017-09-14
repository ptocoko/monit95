import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Account } from '../account/account';
import { BSModalContext, Modal } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from 'angular2-modal';
import { AddClassParticipModal } from './add-class-particip.modal';
import { ParticipService } from '../particip.service';
import { ClassParticip } from "./ClassParticip";
import { Http } from "@angular/http";

const PROJECT_ID: number = 1;

@Component({
	templateUrl: './app/class-particips/class-particips-list.component.html'
})
export class ClassParticipsListComponent implements OnInit {
	classParticips: ClassParticip[];
    account: Account;
	isLoading: boolean = true;

    constructor(
        private readonly accountService: AccountService,
		private readonly participService: ParticipService,
		private readonly modal: Modal,
		private readonly http: Http) {

	}

	ngOnInit() {
        this.accountService.getAccount().subscribe(data => {
            this.account = data.json() as Account;
            this.participService.getAll(PROJECT_ID).subscribe(res => {
				this.classParticips = res.json() as ClassParticip[];
				this.classParticips.forEach((val, i, arr) => {
					if (val.Birthday) {
						val.Birthday = new Date(val.Birthday);
					}
				});
				this.isLoading = false;
			});
		});
	}

	addClassParticip() {
		this.modal.open(AddClassParticipModal, overlayConfigFactory({ isUpdate: false, schoolId: this.account.UserName, projectId: PROJECT_ID }, BSModalContext)).then(dialog => {
			dialog.result.then(classParticip => {
				if (classParticip) {
					this.classParticips.push(classParticip);
				}
			})
		});
		
	}

	updateClassParticip(classParticip: ClassParticip) {
		let index = this.classParticips.indexOf(classParticip);
		this.modal.open(AddClassParticipModal, overlayConfigFactory({
			isUpdate: true,
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

	deleteClassParticip(particip: ClassParticip) {
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
}