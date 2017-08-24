import { Component, OnInit } from "@angular/core";
import { overlayConfigFactory } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { Response } from '@angular/http';

import { ResultsModalComponent } from "./results/results-modal.component";
import { ParticipModel } from "./particip.model";
import { ParticipFormComponent } from './particip-form/particip-form.component'

import { ParticipService } from "./particip.service";
import { UserService } from "../user.service";
import Editmodalcomponent = require("./edit-particip/edit-modal.component");
import EditModalComponent = Editmodalcomponent.EditModalComponent;

import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { DialogRef } from 'angular2-modal';

import { PARTICIPS } from './mock-particips'


@Component({
    selector: "particip-list",
    templateUrl: "./app/particips/particip-list.component.html",
    providers: [Modal]    
})
export class ParticipListComponent implements OnInit {
    particips: ParticipModel[] = [];	
    userName: string;
        
    constructor(private participService: ParticipService,
                private userService: UserService,
                public modal: Modal) {
        
    }

    ngOnInit() {
        //Get participList
        //this.participService.getAll().subscribe((response: Response) => {
        //    this.particips = response.json() as ParticipModel[];
        //    console.log(this.particips);
        //});

		this.particips = PARTICIPS;// as ParticipModel[];
          
        //Get user name
        this.userService.getAccount().subscribe((response: Response) => {
            this.userName = response.json().UserName;
        });
    } 

    edit(particip: ParticipModel) {
        this.modal.open(ParticipFormComponent, overlayConfigFactory(particip, BSModalContext))
            .then((dialog: DialogRef<ParticipModel>) => {
                dialog.result.then(dialogResponse => {
                    this.participService.update(dialogResponse).subscribe((serviceResponse: Response) => {
                        var index = this.particips.indexOf(particip);
                        this.particips[index] = serviceResponse.json() as ParticipModel;
                    });
                });
            });
    }
};