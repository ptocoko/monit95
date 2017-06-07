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
	countOfNotEnteredData: number;
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
				let classes = <string>res.classNumbers;
				this.setDataByParticipCode(parCode, bDay, classes);
				this.setCountOfNotEnteredData();
			}).catch(() => {
				console.log('haha');
			});
		});
	}

	setDataByParticipCode(participCode: string, bDay: Date, participClasses: string) {
		this.particips.forEach((val, i, arr) => {
			if (val.participCode === participCode) {
				val.birthday = bDay;
				val.classNumbers = participClasses;
				return;
			}
		})
	}

	setCountOfNotEnteredData() {
		this.countOfNotEnteredData = 0;
		this.particips.forEach((val, i, arr) => {
			if (val.birthday == null || val.classNumbers.length == 0) {
				this.countOfNotEnteredData++;
			}
		});

	}

	//Get by areaCode
	getByAreaCode() {
		this.participService.getByAreaCode(this.userName, this.isAreaRole).subscribe(
			particips => {
				this.particips = particips;
				this.setCountOfNotEnteredData();
			}
		);
	}
	
}