import { Component, OnInit } from '@angular/core';
import { ParticipModel } from './particip.model';
import { PARTICIPS } from './mock-particips';

import { ParticipService } from './particip.service';
import { UserService }     from '../user.service';

@Component({
    selector: 'particip-list',
    templateUrl: './app/particips/particip-list.html',
    providers: [ParticipService]
})
export class ParticipListComponent implements OnInit {
    particips: ParticipModel[] = [];
    userName: string;

    constructor(private participService: ParticipService, private userService: UserService) { };

    ngOnInit() {
        this.userService.getName().subscribe(
            response => this.userName = response.json()
        );
        //this.items = this.participService.getData();
        //this.particips = PARTICIPS;
        //this.getByAreaCode(201);

    }

    //Get by areaCode
    getByAreaCode(areaCode: number)
    {
        //debugger
        this.participService.getByAreaCode(areaCode).subscribe(
            particips => this.particips = particips
        );
    }
};