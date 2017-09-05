import { Component, OnInit } from '@angular/core';
import { overlayConfigFactory } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Response } from '@angular/http';

import { ResultsModalComponent } from './results/results-modal.component';
import { RsurParticip } from './rsurparticip';
import { ParticipFormComponent } from './particip-form/particip-form.component'

import { RsurParticipService } from './rsurparticip.service';
import { AccountService } from '../account/account.service';
import Editmodalcomponent = require('./edit-particip/edit-modal.component');
import EditModalComponent = Editmodalcomponent.EditModalComponent;

import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { DialogRef } from 'angular2-modal';

@Component({
    selector: 'particip-list',
    templateUrl: './app/rsur/rsurparticip.component.html?v=${new Date().getTime()}',
    providers: [Modal]    
})
export class RsurParticipComponent implements OnInit {
    particips: RsurParticip[] = [];	
    userName: string;
        
    constructor(private readonly rsurParticipService: RsurParticipService,
                private readonly accountService: AccountService,
                public modal: Modal) {        
    }

    ngOnInit() {
        // Get participList
        this.rsurParticipService.getAll()
            .subscribe((response: Response) => {
                this.particips = response.json() as RsurParticip[];                
        });

		//this.particips = PARTICIPS;// as ParticipModel[];
          
        //Get user name
        this.accountService.getAccount().subscribe((response: Response) => {
            this.userName = response.json().UserName;
        });
    } 

    //edit(particip: RsurParticip) {
    //    this.modal.open(ParticipFormComponent, overlayConfigFactory(particip, BSModalContext))
    //        .then((dialog: DialogRef<RsurParticip>) => {
    //            dialog.result.then(dialogResponse => {
    //                this.participService.update(dialogResponse).subscribe((serviceResponse: Response) => {
    //                    var index = this.particips.indexOf(particip);
    //                    this.particips[index] = serviceResponse.json() as RsurParticip;
    //                });
    //            });
    //        });
    //}
};