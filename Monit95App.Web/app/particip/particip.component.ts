import { Component, OnInit } from '@angular/core';
import { ParticipService } from './particip.service';
import { Particip } from './particip';

@Component({
    selector: 'app-particip',
    templateUrl: './app/particip/participlist.html',
    providers: [ParticipService]
})
export class ParticipComponent implements OnInit {
    items: Particip[] = [];

    constructor(private participService: ParticipService) {};

    ngOnInit() {
        this.items = this.participService.getData();
    }
};