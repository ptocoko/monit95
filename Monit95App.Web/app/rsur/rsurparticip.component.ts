import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { RsurParticip } from './rsurparticip';

import { RsurParticipService } from './rsurparticip.service';
import { AccountService } from '../account/account.service';
import { SchoolCollectorService, SchoolCollector } from "../shared/school-collector.service";

const COLLECTOR_ID: number = 1;

@Component({
    selector: 'rsurparticip',
    templateUrl: `./app/rsur/rsurparticip.component.html?v=${new Date().getTime()}`,
    styleUrls: ['./app/rsur/rsurparticip.component.css']
})
export class RsurParticipComponent implements OnInit {
	particips: RsurParticip[] = [];
	isFinished: boolean;

    constructor(private readonly rsurParticipService: RsurParticipService,
				private readonly accountService: AccountService,
				private readonly schoolCollectorService: SchoolCollectorService) { }

    ngOnInit() {
		this.getAllParticips(); 
		
    }

    getAllParticips() {
        this.rsurParticipService.getAll()
            .subscribe((response: Response) => {                
				this.particips = response.json() as RsurParticip[];

				this.schoolCollectorService.getSchoolCollectorState(COLLECTOR_ID).subscribe(res => {
					console.log(res);
					this.isFinished = res;
				});
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

	onFinished() {
		let action = confirm('Вы уверены?');

		if (action) {
			this.schoolCollectorService.isFinished(COLLECTOR_ID, true).subscribe(() => {
				this.isFinished = true;
			});
		}
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