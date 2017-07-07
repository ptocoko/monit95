import { Component, OnInit } from '@angular/core';

import { DialogRef, Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ResultsModalComponent } from './results/results-modal.component';

import { ParticipModel } from './particip.model';
import { UserModel } from '../user.model';
import { PARTICIPS } from './mock-particips';

import { ParticipService } from './particip.service';
import { UserService } from '../user.service';

@Component({
    selector: 'particip-list',
    templateUrl: './app/particips/particip-list.html',
    providers: [Modal]    
})
export class ParticipListComponent implements OnInit {
    particips: ParticipModel[] = [];
	isAreaRole: boolean;
    participListDocPath: string;
        
    constructor(private participService: ParticipService, private userService: UserService, public modal: Modal) { }

    ngOnInit() {
		this.userService.getName().subscribe(user => {
			this.isAreaRole = user.userRoles.indexOf('area')>=0;
			this.getByAreaCode(user);
			if (this.isAreaRole) {
				this.participListDocPath =
					'https://cloud.mail.ru/public/GhWx/bn9GnxmXg/' + user.userName + '/' + user.userName + '_список.xlsx';
			}
		});    
    }

    //Get by areaCode
    getByAreaCode(user: UserModel)
    {        
        this.participService.getByAreaCode(user).subscribe(
            particips => this.particips = particips
        );
	}

	openModal(particip: ParticipModel) {
		this.modal.open(ResultsModalComponent, overlayConfigFactory(particip));
	}
};