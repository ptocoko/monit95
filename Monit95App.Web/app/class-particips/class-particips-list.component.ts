import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Account } from '../account/account';
import { BSModalContext, Modal } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from 'angular2-modal';
import { AddClassParticipModal } from './add-class-particip.modal';
import { ParticipService } from '../particip.service';
import { ClassParticip } from "./ClassParticip";
import { Http } from "@angular/http";
import { Router } from "@angular/router";

const PROJECT_ID: number = 1;

@Component({
	templateUrl: `./app/class-particips/class-particips-list.component.html?v=${new Date().getTime()}`
})
export class ClassParticipsListComponent implements OnInit {
	classParticips: ClassParticip[];
    account: Account;
	isLoading: boolean = true;

    constructor(
        private readonly accountService: AccountService,
		private readonly participService: ParticipService,
		private readonly modal: Modal,
		private readonly router: Router) {

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
		this.router.navigate(['class-particips/new'])
	}

	updateClassParticip(classParticip: ClassParticip) {
		this.router.navigate(['/class-particips/update', classParticip.Id]);
	}

	deleteClassParticip(particip: ClassParticip) {
		let index = this.classParticips.indexOf(particip);
		let isDelete = confirm('Вы уверены что хотите удалить данную запись?');
		if (isDelete) {
			this.participService.deleteParticip(particip.Id).subscribe(res => {
				this.classParticips.splice(index, 1);
			})
		}
	}
}