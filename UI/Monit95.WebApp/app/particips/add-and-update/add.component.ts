import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ParticipService } from '../../services/particip.service';
import { AccountService } from '../../services/account.service';
import { ParticipModel } from '../../models/particip.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddParticipComponent {
	particip = new ParticipModel();
	EgeOrOge: string;
	isSending = false;
	isConflict = false;
	projectId: number;

	constructor(private readonly participService: ParticipService,
				private readonly accountService: AccountService,
				private readonly location: Location,
				private readonly route: ActivatedRoute) { }

	ngOnInit() {
		this.projectId = this.route.snapshot.data['projectId'];
		this.EgeOrOge = this.route.snapshot.data['projectName'];
	}

	onSubmit() {
		this.isSending = true;
		this.isConflict = false;

		// избавляемся от пробелов в начале и в конце
		this.particip.Surname = this.particip.Surname.trim();
		this.particip.Name = this.particip.Name.trim();

		if (this.particip.SecondName) {
			this.particip.SecondName = this.particip.SecondName.trim();
		};

		this.participService.postParticip(this.particip, this.projectId).subscribe(_ => {
			this.back();
		},
		error => {
			this.isSending = false;
			if (error.status === 409) {
				this.isConflict = true;
			} else {
				throw error;
			}
		});
	}


	back() {
		this.location.back();
	}
}