import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ParticipModel } from '../../../models/particip.model';
import { ClassModel } from '../../../models/class.model';
import { ParticipsService } from '../../../services/refactored/particips.service';
import { AccountService } from '../../../services/account.service';
import { ActivatedRoute } from '@angular/router';

const CLASSES: ClassModel[] = [
	{
		Id: '0900',
		Name: '9'
	},
	{
		Id: '1100',
		Name: '11'
	}
];

@Component({
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent {
	particip = new ParticipModel();

	projectName: string;
	projectId: number;

	availableClasses: ClassModel[] = [];

	isSending = false;
	isConflict = false;

	constructor(private readonly participsService: ParticipsService,
		private readonly accountService: AccountService,
		private readonly location: Location,
		private readonly route: ActivatedRoute) { }

	ngOnInit() {
		this.projectId = this.route.snapshot.queryParams['projectId'];
		this.projectName = this.route.snapshot.queryParams['projectName'];

		this.availableClasses = CLASSES;
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

		this.participsService.post(this.particip, this.projectId).subscribe(_ => {
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