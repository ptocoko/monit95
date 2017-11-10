import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AccountModel } from '../models/account.model';
import { ParticipService } from '../particip.service';
import { ClassParticip } from './ClassParticip';

const PROJECT_ID: number = 1;

@Component({
	templateUrl: `./app/class-particips/class-particips-list.component.html?v=${new Date().getTime()}`
})
export class ClassParticipsListComponent implements OnInit {
	classParticips: ClassParticip[];
    account: AccountModel;
	isLoading: boolean = true;

    constructor(
        private readonly accountService: AccountService,
		private readonly participService: ParticipService,
		private readonly router: Router) {

	}

	ngOnInit() {
        this.accountService.getAccount().subscribe(data => {
            this.account = data.json() as AccountModel;
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
	    this.router.navigate(['class-particips/new']);
	}

	updateClassParticip(classParticip: ClassParticip) {
		this.router.navigate(['/class-particips/update', classParticip.Id]);
	}

	deleteClassParticip(particip: ClassParticip) {
		const index = this.classParticips.indexOf(particip);
		const isDelete = confirm('Вы уверены что хотите удалить данную запись?');
		if (isDelete) {
		    this.participService.deleteParticip(particip.Id).subscribe(res => {
		        this.classParticips.splice(index, 1);
		    });
		}
	}
}