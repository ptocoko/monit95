﻿import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { IMyDpOptions } from 'mydatepicker';

import { ParticipModel } from '../particip.model';
import { ParticipService } from '../particip.service';


@Component({
	selector: 'modal-content',
	templateUrl: './app/particips/details/particip-modal.html'
})
export class ParticipModalComponent implements ModalComponent<ParticipModel> {
	particip: ParticipModel;
	private placeholder: string = 'дд.мм.гггг';
	private statusText: string = '';
	private myDatePickerOptions: IMyDpOptions = {
		// other options...
		dateFormat: 'dd.mm.yyyy',
	};

	private dateModel: any = { date: { year: 1985, month: 1, day: 1 } };

	constructor(public dialog: DialogRef<ParticipModel>, private participService: ParticipService) {
		this.particip = dialog.context;
		this.statusText = '';
		if (this.particip.birthday != null) {
			let BDay = this.particip.birthday;
			this.dateModel = {
				date: {
					year: BDay.getFullYear(),
					month: BDay.getMonth() + 1,
					day: BDay.getDate()
				}
			}
		}
		//this.wrongAnswer = true;
		//dialog.setCloseGuard(this);
	}

	cancel() {
		this.dialog.dismiss();
	}

	save() {
		let participClasses = this.getClassesString();
		if (this.dateModel != null && participClasses != null) {

			let date = this.dateModel.date;
			this.particip.birthday = new Date(date.year, date.month - 1, date.day);
			this.particip.classNumbers = participClasses;

			this.participService.updateParticip(this.particip).subscribe(() => {
				this.dialog.close(this.particip);
			}, (error) => {
				this.statusText = 'Ошибка доступа к серверу!';
				console.log(JSON.stringify(error));
			});
		}
		else {
			this.statusText = 'Не все значения указаны!'
		}
	}

	getClassesString(): string {
		let res: string = '';
		var checkboxes = $('#classes').find(':checkbox:checked');
		checkboxes.each(function (i, elem) {
			res += elem.id + '; ';
		});
		if (res.length > 0) {
			res = res.slice(0, res.length - 2);
			return res;
		}
		else
			return null;
	}
}