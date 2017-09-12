import { Component, OnInit } from "@angular/core";
import { DialogRef } from "angular2-modal";
import { Http } from "@angular/http";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { ClassService } from "../class.service";
import { ParticipService } from "../particip.service";
import { ClassParticip } from "./ClassParticip";

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

	statusText: string;
	actionText: string;

	constructor(public dialog: DialogRef<AddClassParticipModalData>,
				private http: Http,
				private classService: ClassService,
				private participService: ParticipService) {
		this.isUpdate = dialog.context.isUpdate;
		this.newMonth = -1;

		if (this.isUpdate) {
			this.particip = dialog.context.particip;

			if (this.particip.Birthday) {
				this.newDay = this.particip.Birthday.getDate();
				this.newMonth = this.particip.Birthday.getMonth();
				this.newYear = this.particip.Birthday.getFullYear();
			}

			this.actionText = "Изменить";
		}
		else {
			this.particip = new ClassParticip();
			this.actionText = "Добавить"
			this.schoolId = dialog.context.schoolId;
			this.projectId = dialog.context.projectId;
		}
	}

	ngOnInit() {
		this.statusText = "";
		this.classService.getClassNames().subscribe(classNames => {
			this.classNames = classNames;
			this.classNames.length = 12;
		}, error => {
			this.statusText = "Ошибка соединения с базой данных! ";
			throw error;
			});
	}

	onSubmit() {
		if (this.newMonth === -1) {
			this.newMonth = 0;
		}
		this.particip.Birthday = new Date(this.newYear, this.newMonth, this.newDay);
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