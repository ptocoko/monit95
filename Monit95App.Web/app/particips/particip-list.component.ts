import { Component, OnInit } from '@angular/core';

import { ParticipModel } from './particip.model';
import { PARTICIPS } from './mock-particips';

import { ParticipService } from './particip.service';
import { UserService } from '../user.service';

@Component({
    selector: 'particip-list',
    templateUrl: './app/particips/particip-list.html',
    providers: [ParticipService, UserService]    
})
export class ParticipListComponent implements OnInit {
    particips: ParticipModel[] = [];
	userName: string;
	isAreaRole: boolean;
    participListDocPath: string;
        
    constructor(private participService: ParticipService, private userService: UserService) { }

    ngOnInit() {
        this.userService.getName().subscribe(
			response => {
				let result = response.json();
				this.userName = result.UserName;  
				this.isAreaRole = result.IsAreaRole;
				this.getByAreaCode();

				if (this.isAreaRole) {
					this.participListDocPath =
						'https://cloud.mail.ru/public/GhWx/bn9GnxmXg/' + this.userName + '/' + this.userName + '_список.xlsx';
				}
            }
        );        
    }

    //Get by areaCode
    getByAreaCode()
    {        
        this.participService.getByAreaCode(this.userName, this.isAreaRole).subscribe(
            particips => this.particips = particips
        );
    }
};