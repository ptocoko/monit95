﻿import { Component, OnInit } from '@angular/core';
import { ParticipCorrection } from './particip-correction';

import { ParticipCorrectionService } from './particip-correction.service';
import { ParticipService } from "../particip.service";

@Component({
    selector: 'particip-correction',
    templateUrl: './app/particips/correction/particip-correction.html',
    providers: [ParticipCorrectionService]
})
export class ParticipCorrectionComponent implements OnInit {
	participCorrections: ParticipCorrection[] = [];
	statusText: string = '';

    constructor(private _participCorrectionService: ParticipCorrectionService, private _participService: ParticipService) { }

    ngOnInit(): void {
        this.getCorrections();
    }

    getCorrections(): void {
		this._participCorrectionService.getCorrections().subscribe(participsCorrections => this.participCorrections = participsCorrections, error=>this.errorHandler(error), () => {
			if (this.participCorrections.length === 0)
				this.statusText = 'Запросов на корректировку данных нет!';
		});        
    };

    applyCorrection(correction: ParticipCorrection) {
		this._participService.getByParticipCode(correction.participCode).subscribe(particip => {
			particip.surname = correction.newParticipSurname;
			particip.name = correction.newParticipName;
			particip.secondName = correction.newParticipSecondName;

			this._participService.updateParticip(particip).subscribe(success => {
				this._participCorrectionService.cancelCorrection(correction.participCode).subscribe(success => this.successHandler(correction, 'Коррекция принята успешно!')/*TODO: handle error!*/)
			}, error => {
				//TODO: обработать ошибку
			})
		}, error => {
			//TODO: обработать ошибку
		})
	}

	cancelCorrection(correction: ParticipCorrection) {
		this._participCorrectionService.cancelCorrection(correction.participCode).subscribe(success => {
			this.successHandler(correction, 'Коррекция отменена!');
		}, error => { });
	}

	successHandler(correction: ParticipCorrection, statusText: string) {
		let index = this.participCorrections.indexOf(correction);
		this.participCorrections.splice(index, 1);
		this.statusText = statusText;
	}

	errorHandler(error: any) {
		console.log(error);
	}
}

