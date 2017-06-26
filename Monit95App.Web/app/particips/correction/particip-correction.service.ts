import { Injectable } from '@angular/core';

import { ParticipCorrection } from './particip-correction';
import { PARTICIPCORRECTIONS } from './particip-correction.mock';

@Injectable()
export class ParticipCorrectionService {

    getCorrections(): Promise<ParticipCorrection[]> {
        return Promise.resolve(PARTICIPCORRECTIONS);
    }
}