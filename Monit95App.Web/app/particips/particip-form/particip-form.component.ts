import { Component, OnInit } from '@angular/core';
import { DialogRef } from 'angular2-modal';

import { ParticipModel } from '../particip.model'

import { ParticipService } from '../particip.service';

@Component({
    selector: 'particip-form',
    templateUrl: './app/particips/particip-form/particip-form.component.html?v=${new Date().getTime()}'
})
export class ParticipFormComponent implements OnInit {
    particip: ParticipModel;    

    constructor(private dialog: DialogRef<ParticipModel>, private participService: ParticipService) {
        this.particip = dialog.context;        
    }
    
    ngOnInit() {        
    }    
}
