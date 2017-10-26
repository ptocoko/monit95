//import { Component, OnInit } from '@angular/core';

//import { DialogRef, ModalComponent } from 'angular2-modal';

//import { RsurParticip as RsurParticipModel } from '../rsurparticip';
//import { RsurParticipService } from '../rsurparticip.service';
//import { ResultsModel, ResultDetailsModel } from './results.model';

//@Component({
//	selector: 'results-modal',
//	templateUrl: './app/rsur/results/results-modal.html'
//})
//export class ResultsModalComponent implements ModalComponent<RsurParticipModel>, OnInit {
//	particip: RsurParticipModel;
//	results: Array<ResultsModel> = [];

//	constructor(public dialog: DialogRef<RsurParticipModel>, private participService: RsurParticipService) {
//		this.particip = dialog.context;
//		//dialog.context.dialogClass = 'modal-dialog modal-mySize';
//	}

//	ngOnInit() {
//        //this.participService.getParticipResults(this.particip.Code).subscribe(res => {
//        //    this.results = res;
//        //});
//	}

//	close() {
//		this.dialog.close();
//	}
//}