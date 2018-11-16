import { Component, OnInit } from '@angular/core';
import { ParticipService } from '../../../services/particip.service';
import { ParticipModel } from '../../../models/particip.model';

const PROJECT_ID = 20;

@Component({
    templateUrl: `./app/particips/society/list/particips-list.component.html?v=${new Date().getTime()}`
})
export class SocietyParticipsListComponent implements OnInit {
	particips: ParticipModel[];

    constructor(private readonly participService: ParticipService) { }

    ngOnInit() {
		this.participService.getByProjectId(PROJECT_ID).subscribe(res => this.particips = res);
    }
}