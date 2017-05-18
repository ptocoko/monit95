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
    areaCode: number;
    participListDocPath: string;
        
    constructor(private participService: ParticipService, private userService: UserService) { }

    ngOnInit() {
        this.userService.getName().subscribe(
            response => {
                this.areaCode = response.json();               
                this.getByAreaCode();
                this.participListDocPath =
                    'https://cloud.mail.ru/public/GhWx/bn9GnxmXg/' + this.areaCode + '/' + this.areaCode + '_список.xlsx';
            }
        );        
    }

    //Get by areaCode
    getByAreaCode()
    {        
        this.participService.getByAreaCode(this.areaCode).subscribe(
            particips => this.particips = particips
        );
    }
};