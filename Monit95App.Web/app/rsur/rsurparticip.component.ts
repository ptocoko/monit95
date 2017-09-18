import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { RsurParticip } from './rsurparticip';

import { RsurParticipService } from './rsurparticip.service';
import { AccountService } from '../account/account.service';


@Component({
    selector: 'rsurparticip',
    templateUrl: './app/rsur/rsurparticip.component.html?v=${new Date().getTime()}',
    styleUrls: ['./app/rsur/rsurparticip.component.css']
})
export class RsurParticipComponent implements OnInit {
    particips: RsurParticip[] = [];	
    userName: string;
        
    constructor(private readonly rsurParticipService: RsurParticipService,
                private readonly accountService: AccountService) { }

    ngOnInit() {
        this.getAllParticips();       
	          
        // Get userName
        this.accountService.getAccount()
            .subscribe((response: Response) => {
                this.userName = response.json().UserName;
        });
    } 

    getAllParticips() {
        this.rsurParticipService.getAll()
            .subscribe((response: Response) => {                
                this.particips = response.json() as RsurParticip[];
            });
    }

    setActualCode(particip: RsurParticip, actualCode: number) {
        particip.ActualCode = actualCode;
        this.rsurParticipService.update(particip.Code, particip)
            .subscribe(() => {
                this.getAllParticips();
            });
    }

    delete(code: number) {
        this.rsurParticipService.delete(code).subscribe(() => {
            this.getAllParticips();
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