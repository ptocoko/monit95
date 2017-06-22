﻿import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { ParticipModel } from '../particip.model';
import { ParticipService } from '../particip.service';

@Component({
	selector: 'edit-modal',
	templateUrl: './app/particips/edit-particip/edit-modal.html',
	styleUrls: ['./app/particips/edit-particip/edit-modal.css']
})
export class EditModalComponent {
	private particip: ParticipModel;

	constructor(private dialog: DialogRef<ParticipModel>, private participService: ParticipService) {
		this.particip = dialog.context;
	}

	onSubmit() {
		this.participService.postRequestToEdit(this.particip).subscribe(res => {
			this.dialog.close();
		}, error => {
			console.log(JSON.stringify(error));
		});
		
	}
}