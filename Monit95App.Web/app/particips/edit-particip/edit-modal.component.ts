import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { ParticipModel } from '../particip.model';
import { ParticipEditModel } from './edit-particip.model';
import { ParticipService } from '../particip.service';

@Component({
	selector: 'edit-modal',
	templateUrl: './app/particips/edit-particip/edit-modal.html',
	styleUrls: ['./app/particips/edit-particip/edit-modal.css']
})
export class EditModalComponent {
	private particip: ParticipModel;
	private editParticip: ParticipEditModel;

	constructor(private dialog: DialogRef<ParticipModel>, private participService: ParticipService) {
		this.particip = dialog.context;
		this.editParticip = new ParticipEditModel(this.particip.participCode, this.particip.surname, this.particip.name, this.particip.secondName);
	}

	onSubmit() {
		this.participService.postRequestToEdit(this.editParticip).subscribe(res => {
			this.particip.hasRequestToEdit = true;
			this.dialog.close(this.particip);
		});
		
	}

	cancel() {
		this.dialog.dismiss();
	}
}