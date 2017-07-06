import { Component, OnInit } from '@angular/core';
import { ParticipCorrection } from './particip-correction';
import { ParticipCorrectionService } from './particip-correction.service';

@Component({
    selector: 'particip-correction',
    templateUrl: './app/particips/correction/particip-correction.html',
    providers: [ParticipCorrectionService]
})
export class ParticipCorrectionComponent implements OnInit {
	participCorrections: ParticipCorrection[] = [];
	statusText: string = '';

    constructor(private _participCorrectionService: ParticipCorrectionService) { }

    ngOnInit(): void {
        this.getCorrections();
    }

    getCorrections(): void {
		this._participCorrectionService.getCorrections().subscribe(participsCorrections => this.participCorrections = participsCorrections, error=>this.errorHandler(error), () => {
			if (this.participCorrections.length === 0)
				this.statusText = 'Запросов на корректировку данных нет!';
		});        
    };

    applyCorrection(correction: ParticipCorrection)
    {
		this._participCorrectionService.applyCorrection(correction).subscribe(success => this.successHandler(correction, 'Коррекция принята!'), error => this.errorHandler(error));
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

