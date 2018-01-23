import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipService } from '../services/particip.service';
import { ClassParticip } from './ClassParticip';
import { ParticipModel } from '../models/particip.model';

const PROJECT_ID: number = 201801; // "i pass ege" projectId


@Component({
	templateUrl: `./app/class-particips/particips-list.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/class-particips/particips-list.component.css?v=${new Date().getTime()}`]
})
export class ParticipsListComponent implements OnInit {
	particips: ParticipModel[];
	isLoading: boolean = true;

    constructor(
		private readonly participService: ParticipService<ParticipModel>,
		private readonly router: Router) {

	}

	ngOnInit() {
        this.participService.getAll(PROJECT_ID).subscribe(res => {
			this.particips = res;
			this.isLoading = false;
		});
	}

	addClassParticip() {
	    this.router.navigate(['/new']);
	}

	updateClassParticip(classParticip: ParticipModel) {
		this.router.navigate(['/update', classParticip.Id]);
	}

	deleteClassParticip(particip: ParticipModel) {
		const index = this.particips.indexOf(particip);
		const isDelete = confirm('Вы уверены что хотите удалить данную запись?');
		if (isDelete) {
		    this.participService.deleteParticip(particip.Id).subscribe(res => {
		        this.particips.splice(index, 1);
		    });
		}
	}
}