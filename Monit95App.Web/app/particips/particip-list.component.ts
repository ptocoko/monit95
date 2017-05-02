import { Component, OnInit } from '@angular/core';
import { ParticipService } from './particip.service';
import { ParticipModel } from './particip.model';
import { PARTICIPS } from './mock-particips';

@Component({
    selector: 'particip-list',
    templateUrl: './app/particips/particip-list.html',
    providers: [ParticipService]
})
export class ParticipListComponent implements OnInit {
    particips: ParticipModel[] = [];

    constructor(private participService: ParticipService) { };

    ngOnInit() {
        //this.items = this.participService.getData();
        this.particips = PARTICIPS;
        this.getByAreaCode(201);
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