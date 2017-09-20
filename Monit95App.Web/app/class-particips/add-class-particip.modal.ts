import { Component, OnInit } from "@angular/core";
import { DialogRef } from "angular2-modal";
import { Http } from "@angular/http";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { ClassService } from "../class.service";
import { ParticipService } from "../particip.service";
import { ClassParticip } from "./ClassParticip";

const CLASS_NAMES = ['1', '1 А', '1 Б', '1 В', '1 Г', '1 Д', '1 Е', '1 Ж', '1 З', '1 И', '1 К', '1 Л'];

export class AddClassParticipModalData extends BSModalContext {
	particip: ClassParticip;
	isUpdate: boolean;
	schoolId: string;
	projectId: number;
}

@Component({
	templateUrl: './app/class-particips/add-class-particip.modal.html'
})
export class AddClassParticipModal implements OnInit {
	particip: ClassParticip;
	classNames: string[];
	isUpdate: boolean;
	schoolId: string;
	projectId: number;

	newDay: number;
	newMonth: number;
	newYear: number;
	wasDoo: string = 'no';

	statusText: string;
	actionText: string;

	constructor(public dialog: DialogRef<AddClassParticipModalData>,
				private http: Http,
				private classService: ClassService,
				private participService: ParticipService) { }

	ngOnInit() {
		this.statusText = "";
		this.classNames = CLASS_NAMES;

		this.isUpdate = this.dialog.context.isUpdate;
		this.newMonth = -1;

		if (this.isUpdate) {
			this.particip = this.dialog.context.particip;
			this.particip.ClassName = this.particip.ClassName.trim();

			if (this.particip.Birthday) {
				this.newDay = this.particip.Birthday.getDate();
				this.newMonth = this.particip.Birthday.getMonth();
				this.newYear = this.particip.Birthday.getFullYear();
			}

			if (this.particip.WasDoo) {
				this.wasDoo = 'yes';
			}

			this.actionText = "Изменить";
		}
		else {
			this.particip = new ClassParticip();
			this.actionText = "Добавить"
			this.schoolId = this.dialog.context.schoolId;
			this.projectId = this.dialog.context.projectId;
		}
	}

	onSubmit() {
		this.particip.WasDoo = this.wasDoo === 'yes';

		if (this.newMonth === -1) {
			this.statusText = "Выберите месяц рождения!"
			return;
		}
		let birthdayInMiSeconds = new Date().setUTCFullYear(this.newYear, this.newMonth, this.newDay);
		this.particip.Birthday = new Date(birthdayInMiSeconds + 10800000);
		if (this.isUpdate) {
			this.participService.updateParticip(this.particip).subscribe(res => {
				this.dialog.close(this.particip);
			}, error => {
				this.statusText = "Ошибка при обновлении участника!";
				throw error;
			});
		}
		else {
			this.particip.SchoolId = this.schoolId;
			this.particip.ProjectId = this.projectId;
			this.participService.addParticip(this.particip).subscribe(res => {
				this.particip.Id = res;
				this.dialog.close(this.particip);
			}, error => {
				this.statusText = "Ошибка при добавлении участника!";
				throw error;
			})
		}
	}

	cancel() {
		this.dialog.close();
	}
}