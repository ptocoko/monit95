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

    constructor(private _participCorrectionService: ParticipCorrectionService) { }

    ngOnInit(): void {
        this.getCorrections();
    }

    getCorrections(): void {
		this._participCorrectionService.getCorrections().subscribe(participsCorrections => this.participCorrections = participsCorrections);        
    };

    applyCorrection(correction: ParticipCorrection): void
    {
        this._participCorrectionService.applyCorrection(correction);
    }
}

