import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { RsurParticipModel } from '../rsur-particip.model';
import { ParticipEditModel } from './edit-particip.model';
import { RsurParticipService } from '../rsur-particip.service';

@Component({
	selector: 'edit-modal',
	templateUrl: './app/rsur/edit-particip/edit-modal.html',
	styleUrls: ['./app/rsur/edit-particip/edit-modal.css']
})
export class EditModalComponent {
	private particip: RsurParticipModel;
	private editParticip: ParticipEditModel;

	constructor(private dialog: DialogRef<RsurParticipModel>, private participService: RsurParticipService) {
		this.particip = dialog.context;
		this.editParticip = new ParticipEditModel(this.particip.participCode, this.particip.surname, this.particip.name, this.particip.secondName);
	}

	onSubmit() {
		this.participService.postRequestToEdit(this.editParticip).subscribe(res => {
			this.dialog.close(this.particip);
		});
		
	}

	cancel() {
		this.dialog.dismiss();
	}
}