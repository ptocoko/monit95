import { Component } from '@angular/core';

import { ParticipService } from '../particip.service';
import { ParticipModel } from '../particip.model';

@Component({
	selector: 'edit-particip',
	templateUrl: './app/particips/edit-particip/edit-particip.html'
})
export class EditParticipComponent {
	private particips: ParticipModel[];

	constructor(private participService: ParticipService) { }

	//ngOnInit() {
	//	this.participService.
	//}
}