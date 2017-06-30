import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParticipCorrection } from './particip-correction';
import { PARTICIPCORRECTIONS } from './particip-correction.mock';

@Injectable()
export class ParticipCorrectionService {

    constructor(private _http: Http) { }

    getCorrections(): Observable<ParticipCorrection[]> {
		return this._http.get('/api/RsurParticipEdit/Get').map((resp: Response) => {
			let models = resp.json();
			let particips = new Array<ParticipCorrection>();
			for (let index in models) {
				let model = models[index];

				let particip = new ParticipCorrection();
				particip.participCode = model.ParticipCode;
				particip.oldParticipSurname = model.OldParticipSurname;
				particip.newParticipSurname = model.NewParticipSurname;
				particip.oldParticipName = model.OldParticipName;
				particip.newParticipName = model.NewParticipName;
				particip.oldParticipSecondName = model.OldParticipSecondName;
				particip.newParticipSecondName = model.NewParticipSecondName;

				particips.push(particip);
			}
			
			return particips;
		})
	}

	cancelCorrection(participCode: string): Observable<any> {
		return this._http.delete('/api/RsurParticipEdit/Cancel?participCode=' + participCode);
	}

    applyCorrection(correction: ParticipCorrection): void
    {
        this._http.put('/api/participCorrections', + correction);
    }
}