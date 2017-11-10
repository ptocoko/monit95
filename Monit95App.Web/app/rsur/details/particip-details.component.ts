import { Component, OnInit } from '@angular/core';

import { DialogRef, Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { RsurParticip as RsurParticipModel } from '../../rsur-particip.model';
import { ParticipModalComponent } from './particip-modal.component';

import { RsurParticipService } from '../../services/rsurparticip.service';

@Component({
	selector: 'particip-details',
	templateUrl: './app/rsur/details/particip-details.html',
	providers: [Modal]
})
export class ParticipDetailsComponent implements OnInit {
	particips: RsurParticipModel[];
	countOfNotEnteredData: number;
	constructor(private participService: RsurParticipService, public modal: Modal) { }

	ngOnInit() {		
	//		this.get();		
	}

	modalOpen(particip: RsurParticipModel) {
		let modalWindow = this.modal.open(ParticipModalComponent, overlayConfigFactory(particip, BSModalContext)).then((dialog: DialogRef<RsurParticipModel>) => {
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
		//this.particips.forEach((val, i, arr) => {
		//	if (val.Code === participCode) {
		//		val.Birthday = bDay;
		//		val.ClassNumbers = participClasses;
		//		return;
		//	}
		//})
	}

	setCountOfNotEnteredData() {
		this.countOfNotEnteredData = 0;
		if (this.particips != null && this.particips.length > 0) {
			this.particips.forEach((val, i, arr) => {
				if (val.Birthday == null || val.ClassNumbers.length == 0) {
					this.countOfNotEnteredData++;
				}
			});
		}
	}
	
	//get() {
	//	this.participService.getAll().subscribe(
	//		particips => {
	//			this.particips = particips;
	//			this.setCountOfNotEnteredData();
	//		}
	//	);
	//}
	
}