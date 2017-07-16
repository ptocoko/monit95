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
        
    constructor(private participService: ParticipService, private userService: UserService, public modal: Modal) { }

    ngOnInit() {
        this.get();		  
    }

    downloadXlsx()
    {
        this.participService.getXlsxParticipList();
    }

    get()
    {        
        this.participService.get().subscribe(
            particips => this.particips = particips
        );
	}

	openModal(particip: ParticipModel) {
		this.modal.open(ResultsModalComponent, overlayConfigFactory(particip));
	}
};