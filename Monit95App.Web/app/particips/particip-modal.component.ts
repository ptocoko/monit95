import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { IMyDpOptions } from 'mydatepicker';

import { ParticipModel } from './particip.model';


@Component({
	selector: 'modal-content',
	template: `
        <div style="width:100%;padding:15px">
			<h3>{{particip.surname}} {{particip.name}} {{particip.secondName}}</h3>
            <hr/>
			<label style="margin-left:33%">
				Введите дату рождения:</label>
            <div style="width:40%;margin-left:30%">
                <form #myForm="ngForm" novalidate>
					<my-date-picker [placeholder]="placeholder" name="mydate" [options]="myDatePickerOptions"
									[(ngModel)]="dateModel" required></my-date-picker>
				</form>
            </div>
			<hr/>
			<div id="classes">
				<label>Выберите классы: </label>
				<div class="checkbox">
					<label>
						<input id="5" type="checkbox" value="">
						5
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input id="6" type="checkbox" value="">
						6
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input id="7" type="checkbox" value="">
						7
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input id="8" type="checkbox" value="">
						8
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input id="9" type="checkbox" value="">
						9
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input id="10" type="checkbox" value="">
						10
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input id="11" type="checkbox" value="">
						11
					</label>
				</div>
			</div>
			<hr/>
			<div style="text-align:right">
				<span style="margin-right:20px;color:red">{{statusText}}</span>
				<button class="btn btn-success" (click)="save(particip)">Сохранить</button>
				<button class="btn btn-default btn-in-horizon" (click)="cancel()">Отменить</button>
			</div>
        </div>`
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

	constructor(public dialog: DialogRef<ParticipModel>) {
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
			this.particip.birthday = new Date(date.year, date.month-1, date.day);
			this.particip.classes = participClasses;
			this.dialog.close(this.particip);
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
