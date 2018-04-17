import { Component } from '@angular/core';
import { ParticipService } from '../../../services/one-two-three/particips.service';
import { ParticipModel } from '../../../models/one-two-three/particip.model';

@Component({
	templateUrl: `./app/one-two-three/particips/list/particips-list.component.html?v=${new Date().getTime()}`,
})
export class ParticipsListComponent {
	particip: ParticipModel[] = [];

	constructor(private participService: ParticipService) { }

	ngOnInit() {
		this.participService.getAll().subscribe(res => {
			this.particip = res;
		});
	}
}