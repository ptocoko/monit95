import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ParticipService } from '../../services/particip.service';
import { ClassParticip } from '../ClassParticip';
import { AccountService } from '../../services/account.service';
import { ParticipModel } from '../../models/particip.model';
import { Constant } from '../../shared/constants';


@Component({
	templateUrl: `./app/particips/add-and-update/add.component.html?v=${new Date().getTime()}`
})
export class AddParticipComponent {
	particip: ParticipModel = new ParticipModel();
	actionText: string = 'Добавить'

	constructor(private readonly participService: ParticipService,
				private readonly accountService: AccountService,
				private readonly location: Location) { }
	
	onSubmit() {
		this.particip.ProjectId = Constant.PROJECT_ID;
		this.particip.SchoolId = this.accountService.account.UserName;
		this.particip.SourceName = "Школа";
		this.participService.addParticip(this.particip).subscribe(res => {
			this.back();
		});
	}

	back() {
		this.location.back();
	}
}