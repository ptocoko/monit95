import { Component } from '@angular/core';

import { ParticipService } from '../particip.service';
import { UserService } from '../../user.service';
import { ParticipModel } from '../particip.model';

@Component({
	selector: 'edit-particip',
	templateUrl: './app/particips/edit-particip/edit-particip.html'
})
export class EditParticipComponent {
	private particips: ParticipModel[];

	constructor(private participService: ParticipService, private userService: UserService) { }

	ngOnInit() {
		this.userService.getName().subscribe(user => {
			this.participService.getByAreaCode(user).subscribe(particips => this.particips = particips);
		});
	}
}