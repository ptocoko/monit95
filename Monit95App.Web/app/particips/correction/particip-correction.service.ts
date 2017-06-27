import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ParticipCorrection } from './particip-correction';
import { PARTICIPCORRECTIONS } from './particip-correction.mock';

@Injectable()
export class ParticipCorrectionService {

    constructor(private _http: Http) { }

    getCorrections(): Promise<ParticipCorrection[]> {
        return Promise.resolve(PARTICIPCORRECTIONS);
    }

    applyCorrection(correction: ParticipCorrection): void
    {
        this._http.put('/api/participCorrections', + correction);
    }
}