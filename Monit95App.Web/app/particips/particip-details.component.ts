import { Component, OnInit } from '@angular/core';

import { DialogRef, Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { ParticipModel } from './particip.model';
import { ParticipModalComponent } from './particip-modal.component';

import { ParticipService } from './particip.service';
import { UserService } from '../user.service';

@Component({
	selector: 'particip-details',
	templateUrl: './app/particips/particip-details.html',
	providers: [ParticipService, UserService, Modal]
})
export class ParticipDetailsComponent implements OnInit {
	particips: ParticipModel[];
	userName: string;
	isAreaRole: boolean;
	constructor(private participService: ParticipService, private userService: UserService, public modal: Modal) { }

	ngOnInit() {
		this.userService.getName().subscribe(
			response => {
				let result = response.json();
				this.userName = result.UserName;
				this.isAreaRole = result.IsAreaRole;
				this.getByAreaCode();
			}
		);
	}

	modalOpen(particip: ParticipModel) {
		let modalWindow = this.modal.open(ParticipModalComponent, overlayConfigFactory(particip, BSModalContext)).then((dialog: DialogRef<ParticipModel>) => {
			dialog.result.then(res => {
				let bDay = <Date>res.birthday;
				let parCode = <string>res.participCode;
				let classes = <string>res.classes;
				this.setBDayByParticipCode(parCode, bDay, classes);
			}).catch(() => {
				console.log('haha');
			});
		});
	}

	setBDayByParticipCode(participCode: string, bDay: Date, participClasses: string) {
		this.particips.forEach((val, i, arr) => {
			if (val.participCode === participCode) {
				val.birthday = bDay;
				val.classes = participClasses;
				return;
			}
		})
	}

	//Get by areaCode
	getByAreaCode() {
		this.participService.getByAreaCode(this.userName, this.isAreaRole).subscribe(
			particips => this.particips = particips
		);
	}
	
}