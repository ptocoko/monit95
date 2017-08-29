import { Component } from '@angular/core';

import { DialogRef, Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { EditModalComponent } from './edit-modal.component';

import { RsurParticipService } from '../rsur-particip.service';
import { UserService } from '../../user.service';
import { RsurParticipModel } from '../rsur-particip.model';

@Component({
	selector: 'edit-particip',
	templateUrl: './app/rsur/edit-particip/edit-particip.html',
	providers: [Modal]
})
export class EditParticipComponent {
	private particips: RsurParticipModel[];

	constructor(private participService: RsurParticipService, private userService: UserService, private modal: Modal) { }

    //ngOnInit() {
    //    this.participService.get().subscribe(particips => this.particips = particips);
    //}

	modalOpen(particip: RsurParticipModel) {
		this.modal.open(EditModalComponent, overlayConfigFactory(particip, BSModalContext)).then((dialog: DialogRef<RsurParticipModel>) => {
			dialog.result.then(res => {
				this.setDataByParticipCode(res);
			}).catch(() => {

			})
		});
	}

	setDataByParticipCode(particip: RsurParticipModel) {
		this.particips.forEach((val, i, arr) => {
			if (val.participCode === particip.participCode) {				
				return;
			}
		})
	}
}