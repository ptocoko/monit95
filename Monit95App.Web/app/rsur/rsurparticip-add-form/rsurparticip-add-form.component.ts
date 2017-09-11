import { Component, OnInit } from '@angular/core';
import { DialogRef } from 'angular2-modal';

import { RsurParticip } from '../rsurparticip'
import { RsurParticipService } from '../rsurparticip.service';

@Component({
    selector: 'add-modal-form',
    templateUrl: './app/rsur/add-modal-form/add-modal-form.html?v=${new Date().getTime()}'
})
export class AddModalFormComponent implements OnInit {
    particip: RsurParticip;

    constructor(
        private readonly dialog: DialogRef<RsurParticip>,
        private readonly participService: RsurParticipService) {
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
