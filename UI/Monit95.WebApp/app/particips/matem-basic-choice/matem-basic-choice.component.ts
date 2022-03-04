import { Component } from '@angular/core';
import { ParticipModel } from '../../models/particip.model';
import { ParticipService } from '../../services/particip.service';

@Component({
    templateUrl: `./app/particips/matem-basic-choice/matem-basic-choice.component.html?v=${new Date().getTime()}`
})
export class MatemBasicChoice {
    particips: ParticipModel[];

    constructor(private readonly participService: ParticipService) { }

    ngOnInit() {
        this.participService.getAll().subscribe(res => this.particips = res);
    }
}