import { Component, OnInit } from "@angular/core";
import { DialogRef } from "angular2-modal";
import { Http } from "@angular/http";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { ParticipModel } from "../particip.model";

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

	constructor(public dialog: DialogRef<AddClassParticipModalData>, private http: Http) {
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
		this.classNames = ["1 A", "1 B", "1 E"]
	}

	onSubmit() {
		if (this.isUpdate) {
			//TODO: service for class particips

		}
		else {

		}
		this.dialog.close(this.particip);
	}
}