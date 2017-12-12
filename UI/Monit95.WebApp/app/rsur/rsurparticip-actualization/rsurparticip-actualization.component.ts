﻿import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { RsurParticipModel } from '../../models/rsur-particip.model';

import { RsurParticipService } from '../../services/rsur-particip.service';
import { AccountService } from '../../services/account.service';
import { SchoolCollectorService } from '../../shared/school-collector.service';

const COLLECTOR_ID: number = 1;

@Component({
    selector: 'rsur/particips',
    templateUrl: `./app/rsur/rsur-particips/rsur-particips.component.html?v=${new Date().getTime()}`,
    styleUrls: ['./app/rsur/rsur-particips/rsur-particips.component.css']
})
export class RsurParticipsActualizationComponent implements OnInit {
    particips: RsurParticipModel[] = [];
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
                this.particips = response.json() as RsurParticipModel[];

				this.schoolCollectorService.getSchoolCollectorState(COLLECTOR_ID).subscribe(res => {
					console.log(res);
					this.isFinished = res;
				});
            });
    }

    setActualCode(particip: RsurParticipModel, actualCode: number) {
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
	    const action = confirm('Вы уверены?');

	    if (action) {
			this.schoolCollectorService.isFinished(COLLECTOR_ID, true).subscribe(() => {
				this.isFinished = true;
			});
		}
    }
};