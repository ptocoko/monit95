import { Component, OnInit } from '@angular/core';

import { DialogRef, Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { ParticipModel } from '../particip.model';
import { UserModel } from '../../user.model';
import { ParticipModalComponent } from './particip-modal.component';

import { ParticipService } from '../particip.service';

@Component({
	selector: 'particip-details',
	templateUrl: './app/particips/details/particip-details.html',
	providers: [Modal]
})
export class ParticipDetailsComponent implements OnInit {
	particips: ParticipModel[];
	countOfNotEnteredData: number;
	constructor(private participService: ParticipService, public modal: Modal) { }

	ngOnInit() {		
			this.get();		
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
				//console.log('haha');
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
		if (this.particips != null && this.particips.length > 0) {
			this.particips.forEach((val, i, arr) => {
				if (val.birthday == null || val.classNumbers.length == 0) {
					this.countOfNotEnteredData++;
				}
			});
		}
	}
	
	get() {
		this.participService.get().subscribe(
			particips => {
				this.particips = particips;
				this.setCountOfNotEnteredData();
			}
		);
	}
	
}