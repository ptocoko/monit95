import { Component, OnInit } from '@angular/core';
import { ParticipService } from '../../../services/particip.service';
import { ParticipModel } from '../../../models/particip.model';

@Component({
    templateUrl: `./app/particips/oge/list/particips-list.component.html?v=${new Date().getTime()}`
})
export class OgeParticipsListComponent implements OnInit {
	particips: ParticipModel[];

    constructor(private readonly participService: ParticipService) { }

    ngOnInit() {
		this.participService.getAllOge().subscribe(res => this.particips = res);
    }
}