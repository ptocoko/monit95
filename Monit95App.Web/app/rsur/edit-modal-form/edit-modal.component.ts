//import { Component } from '@angular/core';

//import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
//import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

//import { RsurParticipModel } from '../../models/rsur-particip.model';
//import { ParticipEditModel } from './edit-particip.model';
//import { RsurParticipService } from '../../services/rsur-particip.service';

//@Component({
//	selector: 'edit-modal',
//	templateUrl: './app/rsur/edit-modal-form/edit-modal.html',
//	styleUrls: ['./app/rsur/edit-modal-form/edit-modal.css']
//})
//export class EditModalComponent {
//	private particip: RsurParticipModel;
//	private editParticip: ParticipEditModel;

//	constructor(private dialog: DialogRef<RsurParticipModel>, private participService: RsurParticipService) {
//		this.particip = dialog.context;		
//	}	

//	cancel() {
//		this.dialog.dismiss();
//	}
//}