﻿import { Component, OnInit } from "@angular/core";
import { DialogRef } from "angular2-modal";
import { Http } from "@angular/http";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { ParticipModel } from "../particip.model";
import { ClassService } from "../class.service";
import { ParticipService } from "../particip.service";

export class AddClassParticipModalData extends BSModalContext {
	particip: ParticipModel;
	isUpdate: boolean;
	schoolId: string;
	projectId: number;
}

@Component({
	templateUrl: './app/class-particips/add-class-particip.modal.html'
})
export class AddClassParticipModal implements OnInit {
	particip: ParticipModel;
	classNames: string[];
	isUpdate: boolean;
	schoolId: string;
	projectId: number;

	statusText: string;
	actionText: string;

	constructor(public dialog: DialogRef<AddClassParticipModalData>, private http: Http, private classService: ClassService, private participService: ParticipService) {
		this.isUpdate = dialog.context.isUpdate;

		if (this.isUpdate) {
			this.particip = dialog.context.particip;
			this.actionText = "Изменить";
		}
		else {
			this.particip = new ParticipModel();
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