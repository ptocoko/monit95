import { Component, OnInit } from "@angular/core";
import { DialogRef } from "angular2-modal";
import { Http } from "@angular/http";
import { ClassParticipModel } from "./class-particip.model";
import { BSModalContext } from "angular2-modal/plugins/bootstrap";
import { ParticipService } from "../particips/particip.service";

export class AddClassParticipModalData extends BSModalContext {
	particip: ClassParticipModel;
	isUpdate: boolean;
}

@Component({
	templateUrl: './app/class-particips/add-class-particip.modal.html'
})
export class AddClassParticipModal implements OnInit {
	particip: ClassParticipModel;
	classNames: string[];
	isUpdate: boolean;
	statusText: string;
	actionText: string;

	constructor(public dialog: DialogRef<AddClassParticipModalData>, private http: Http) {
		this.isUpdate = dialog.context.isUpdate;
		if (this.isUpdate) {
			this.particip = dialog.context.particip;
			this.actionText = "Изменить";
		}
		else {
			this.particip = new ClassParticipModel("", "", "", "");
			this.actionText = "Добавить"
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