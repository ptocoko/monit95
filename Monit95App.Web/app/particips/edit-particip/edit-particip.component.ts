import { Component } from '@angular/core';

import { DialogRef, Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { EditModalComponent } from './edit-modal.component';

import { ParticipService } from '../particip.service';
import { UserService } from '../../user.service';
import { ParticipModel } from '../particip.model';

@Component({
	selector: 'edit-particip',
	templateUrl: './app/particips/edit-particip/edit-particip.html',
	providers: [Modal]
})
export class EditParticipComponent {
	private particips: ParticipModel[];

	constructor(private participService: ParticipService, private userService: UserService, private modal: Modal) { }

	ngOnInit() {
		this.userService.getName().subscribe(user => {
			this.participService.getByAreaCode(user).subscribe(particips => this.particips = particips);
		});
	}

	modalOpen(particip: ParticipModel) {
		this.modal.open(EditModalComponent, overlayConfigFactory(particip, BSModalContext)).then((dialog: DialogRef<ParticipModel>) => {
			dialog.result.then(res => {
				this.setDataByParticipCode(res);
			}).catch(() => {

			})
		});
	}

	setDataByParticipCode(particip: ParticipModel) {
		this.particips.forEach((val, i, arr) => {
			if (val.participCode === particip.participCode) {
				val.hasRequestToEdit = particip.hasRequestToEdit;
				return;
			}
		})
	}
}