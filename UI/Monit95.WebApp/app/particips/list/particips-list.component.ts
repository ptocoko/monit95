import { Component, OnInit } from '@angular/core';
import { ParticipService } from '../../services/particip.service';
import { ParticipModel } from '../../models/particip.model';

@Component({
    templateUrl: `./app/particips/list/particips-list.component.html?v=${new Date().getTime()}`,
    styleUrls: [`./app/particips/list/particips-list.component.css?v=${new Date().getTime()}`]
})
export class ParticipsListComponent implements OnInit {
	particips: ParticipModel[];

    constructor(private readonly participService: ParticipService) { }

    ngOnInit() {
		this.participService.getAll().subscribe(res => this.particips = res);
    }
}