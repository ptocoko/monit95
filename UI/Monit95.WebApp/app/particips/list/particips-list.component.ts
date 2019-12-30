import { Component, OnInit } from '@angular/core';
import { ParticipService } from '../../services/particip.service';
import { ParticipModel } from '../../models/particip.model';

@Component({
    templateUrl: './particips-list.component.html',
    styleUrls: ['./particips-list.component.css']
})
export class ParticipsListComponent implements OnInit {
	particips: ParticipModel[];

    constructor(private readonly participService: ParticipService) { }

    ngOnInit() {
		this.participService.getAll().subscribe(res => this.particips = res);
    }
}