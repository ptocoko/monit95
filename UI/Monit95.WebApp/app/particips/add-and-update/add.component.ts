﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ParticipService } from '../../services/particip.service';
import { ClassParticip } from '../ClassParticip';
import { AccountService } from '../../services/account.service';
import { ParticipModel } from '../../models/particip.model';
import { Constant } from '../../shared/constants';


@Component({
	templateUrl: `./app/particips/add-and-update/add.component.html?v=${new Date().getTime()}`,
	styleUrls: [`./app/particips/add-and-update/add.component.css?v=${new Date().getTime()}`]
})
export class AddParticipComponent {
	particip: ParticipModel = new ParticipModel();
	actionText: string = 'Добавить'
	isSending = false;
	isConflict = false;

	constructor(private readonly participService: ParticipService,
				private readonly accountService: AccountService,
				private readonly location: Location) { }
	
	onSubmit() {
		this.isSending = true;
		this.isConflict = false;
		this.participService.postParticip(this.particip).subscribe(_ => {
			this.back();
		},
		error => {
			if (error.status === 409) {
				this.isSending = false;
				this.isConflict = true;
			}
		});
	}

	back() {
		this.location.back();
	}
}