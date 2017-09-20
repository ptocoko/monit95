import { Component, OnInit } from '@angular/core';
import { ParticipService } from "../../particip.service";
import { ClassParticip } from "../ClassParticip";
import { AccountService } from "../../account/account.service";
import { Router } from "@angular/router";

const CLASS_NAMES = ['1', '1 А', '1 Б', '1 В', '1 Г', '1 Д', '1 Е', '1 Ж', '1 З', '1 И', '1 К', '1 Л'];
const PROJECT_ID: number = 1;

@Component({
	templateUrl: './app/class-particips/add-and-update/add.component.html?v=${new Date().getTime()}'
})
export class AddClassParticipComponent implements OnInit {
	particip: ClassParticip = new ClassParticip();
	classNames: string[] = CLASS_NAMES;

	newDay: number;
	newMonth: number;
	newYear: number;
	wasDoo: string = 'no';
	actionText: string = 'Добавить'

	constructor(private participService: ParticipService,
				private accountService: AccountService,
				private router: Router) { }

	ngOnInit() {
		this.accountService.getAccount().subscribe(res => {
			this.particip.SchoolId = res.json().UserName;
			this.particip.ProjectId = PROJECT_ID;
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
		this.participService.addParticip(this.particip).subscribe(res => {
			this.router.navigate(['class-particips/list'])
		});
	}

	cancel() {
		this.router.navigate(['class-particips/list']);
	}
}