//import { Component } from '@angular/core';

//import { DialogRef, overlayConfigFactory } from 'angular2-modal';
//import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

//import { EditModalComponent } from './edit-modal.component';

//import { RsurParticipService } from '../../services/rsur-particip.service';
//import { AccountService } from '../../services/account.service';
//import { RsurParticipModel } from '../../models/rsur-particip.model';

//@Component({
//	selector: 'edit-particip',
//	templateUrl: './app/rsur/edit-modal-form/edit-particip.html',
//	providers: [Modal]
//})
//export class EditParticipComponent {
//	private particips: RsurParticipModel[];

//    constructor(
//        private readonly participService: RsurParticipService,
//        private readonly accountService: AccountService,
//        private readonly modal: Modal) {
        
//    }

//	modalOpen(particip: RsurParticipModel) {
//		this.modal.open(EditModalComponent, overlayConfigFactory(particip, BSModalContext)).then((dialog: DialogRef<RsurParticipModel>) => {
//		    dialog.result.then(res => {
//		        this.setDataByParticipCode(res);
//		    }).catch(() => {

//		    });
//		});
//	}

//	setDataByParticipCode(particip: RsurParticipModel) {
//	    this.particips.forEach((val, i, arr) => {
//	        if (val.Code === particip.Code) {
//	            return;
//	        }
//	    });
//	}
//}