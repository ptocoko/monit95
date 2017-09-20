import { Component, OnInit } from '@angular/core';
import { ClassParticip } from "../ClassParticip";
import { ParticipService } from "../../particip.service";
import { AccountService } from "../../account/account.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

const CLASS_NAMES = ['1', '1 А', '1 Б', '1 В', '1 Г', '1 Д', '1 Е', '1 Ж', '1 З', '1 И', '1 К', '1 Л'];
const PROJECT_ID: number = 1;

@Component({
	templateUrl: `./app/class-particips/add-and-update/update.component.html?v=${new Date().getTime()}`
})
export class UpdateClassParticipComponent implements OnInit {
	particip: ClassParticip = new ClassParticip();
	classNames: string[] = CLASS_NAMES;

	newDay: number;
	newMonth: number;
	newYear: number;
	wasDoo: string = 'no';
	actionText: string = 'Изменить'

	constructor(private participService: ParticipService,
				private accountService: AccountService,
				private router: Router,
				private route: ActivatedRoute) { }

	ngOnInit() {
		let participId = this.route.snapshot.paramMap.get('id');

		this.participService.getParticip(+participId).subscribe(res => {
			this.particip = res.json();
			this.particip.ClassName = this.particip.ClassName.trim();
			this.particip.Birthday = new Date(this.particip.Birthday);

			if (this.particip.Birthday) {
				this.newDay = this.particip.Birthday.getDate();
				this.newMonth = this.particip.Birthday.getMonth();
				this.newYear = this.particip.Birthday.getFullYear();
			}

			if (this.particip.WasDoo) {
				this.wasDoo = 'yes';
			}
		});
	}

	onSubmit() {
		this.particip.WasDoo = this.wasDoo === 'yes';

		if (this.newMonth === -1) {
			alert("Выберите месяц рождения!");
			return;
		}
		let birthdayInMiSeconds = new Date().setUTCFullYear(this.newYear, this.newMonth, this.newDay);
		this.particip.Birthday = new Date(birthdayInMiSeconds + 10800000);
		console.log(this.particip);
		this.participService.updateParticip(this.particip).subscribe(res => {
			this.router.navigate(['class-particips/list'])
		});
	}

	cancel() {
		this.router.navigate(['class-particips/list']);
	}
}