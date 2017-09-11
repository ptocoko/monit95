import { Component, OnInit } from '@angular/core';

import { RsurParticip } from '../rsurparticip'
import { RsurParticipService } from '../rsurparticip.service';

@Component({
    selector: 'rsurparticip-add-form',
    templateUrl: './app/rsur/rsurparticip-add-form/rsurparticip-add-form.html?v=${new Date().getTime()}'
})
export class AddModalFormComponent implements OnInit {
    particip: RsurParticip;

    constructor(        
        private readonly rsurParticipService: RsurParticipService) {
    }

    ngOnInit() {        
    }        
}