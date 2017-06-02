import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ParticipModel } from './particip.model';
import { NgbdModalContent } from './particip-modal.component';

import { ParticipService } from './particip.service';
import { UserService } from '../user.service';

@Component({
	selector: 'particip-details',
	templateUrl: './app/particips/particip-details.component.html',
	providers: [ParticipService, UserService]
})
export class ParticipDetailsComponent implements OnInit {
	particips: ParticipModel[];
	userName: string;
	isAreaRole: boolean;
	constructor(private participService: ParticipService, private userService: UserService) { }

	ngOnInit() {
		this.userService.getName().subscribe(
			response => {
				let result = response.json();
				this.userName = result.UserName;
				this.isAreaRole = result.IsAreaRole;
				this.getByAreaCode();
			}
		);
	}

	//Get by areaCode
	getByAreaCode() {
		this.participService.getByAreaCode(this.userName, this.isAreaRole).subscribe(
			particips => this.particips = particips
		);
	}
	
}