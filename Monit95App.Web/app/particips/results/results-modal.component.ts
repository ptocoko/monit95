import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent } from 'angular2-modal';

import { ParticipModel } from '../particip.model';
import { ParticipService } from '../particip.service';
import { ResultsModel, ResultDetailsModel } from './results.model';

@Component({
	selector: 'results-modal',
	templateUrl: './app/particips/results/results-modal.html'
})
export class ResultsModalComponent implements ModalComponent<ParticipModel>, OnInit {
	particip: ParticipModel;
	results: Array<ResultsModel> = [];

	constructor(public dialog: DialogRef<ParticipModel>, private participService: ParticipService) {
		this.particip = dialog.context;
		dialog.context.dialogClass = 'modal-dialog modal-mySize';
	}

	ngOnInit() {
		this.getResults(this.particip.participCode);
	}

	getResults(participCode: string) {
		this.participService.getParticipResults(participCode).subscribe(res => {
			this.results = res;
		});
	}

	close() {
		this.dialog.close();
	}
}