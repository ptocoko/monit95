import { Component } from '@angular/core';

import { DialogRef, Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { EditModalComponent } from './edit-modal.component';

import { RsurParticipService } from '../rsurparticip.service';
import { AccountService } from '../../account/account.service';
import { RsurParticip as RsurParticipModel } from '../rsurparticip';

@Component({
	selector: 'edit-particip',
	templateUrl: './app/rsur/edit-modal-form/edit-particip.html',
	providers: [Modal]
})
export class EditParticipComponent {
	private particips: RsurParticipModel[];

    constructor(
        private readonly participService: RsurParticipService,
        private readonly accountService: AccountService,
        private readonly modal: Modal) { }

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
			if (val.Code === particip.Code) {				
				return;
			}
		})
	}
}