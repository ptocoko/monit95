﻿import { Component, OnInit } from '@angular/core';

import { ParticipModel } from './particip.model';
import { PARTICIPS } from './mock-particips';
import { ParticipFilterPipe } from './particip-filter.pipe'

import { ParticipService } from './particip.service';
import { UserService } from '../user.service';

@Component({
    selector: 'particip-list',
    templateUrl: './app/particips/particip-list.html',
    providers: [ParticipService, UserService]
  //  pipes: [ParticipPipe]
})
export class ParticipListComponent implements OnInit {
    particips: ParticipModel[] = [];
    areaCode: number;

    constructor(private participService: ParticipService, private userService: UserService) { };

    ngOnInit() {
        this.userService.getName().subscribe(
            response => {
                this.areaCode = response.json();
                this.particips = PARTICIPS;        
                this.getByAreaCode();
            }
        );
        
    }

    //Get by areaCode
    getByAreaCode()
    {
        //debugger
        this.participService.getByAreaCode(this.areaCode).subscribe(
            particips => this.particips = particips
        );
    }
};