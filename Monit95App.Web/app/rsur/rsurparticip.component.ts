import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { RsurParticip } from './rsurparticip';

import { RsurParticipService } from './rsurparticip.service';
import { AccountService } from '../account/account.service';


@Component({
    selector: 'particip-list',
    templateUrl: './app/rsur/rsurparticip.component.html?v=${new Date().getTime()}',
})
export class RsurParticipComponent implements OnInit {
    particips: RsurParticip[] = [];	
    userName: string;
        
    constructor(private readonly rsurParticipService: RsurParticipService,
                private readonly accountService: AccountService) { }

    ngOnInit()
    {
        // Get particips
        this.rsurParticipService.getAll()
            .subscribe((response: Response) => {
                console.log(response);
                this.particips = response.json() as RsurParticip[];                
        });
	          
        // Get userName
        this.accountService.getAccount()
            .subscribe((response: Response) => {
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