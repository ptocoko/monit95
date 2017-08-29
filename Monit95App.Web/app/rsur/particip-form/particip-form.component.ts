import { Component, OnInit } from '@angular/core';
import { DialogRef } from 'angular2-modal';

import { RsurParticipModel } from '../rsur-particip.model'
import { RsurParticipService } from '../rsur-particip.service';

@Component({
    selector: 'particip-form',
	templateUrl: './app/rsur/particip-form/particip-form.component.html?v=${new Date().getTime()}'
})
export class ParticipFormComponent implements OnInit {
    particip: RsurParticipModel;    

    constructor(private dialog: DialogRef<RsurParticipModel>, private participService: RsurParticipService) {

    }
    
    ngOnInit() {        
        this.particip = this.dialog.context;
    }    

    onSubmit() {
        console.log(this.particip);
        this.dialog.close(this.particip);
    }

    cancel() {
        this.dialog.dismiss();
    }
}
