import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';

@Component({
	templateUrl: `./app/particips/oge/home/home.component.html?v=${new Date().getTime()}`
})
export class OgeHomeComponent {
	date = new Date();

	constructor(public account: AccountService) { }

	ngOnInit() {
	}

	setTimer(day: number, hours: number = 8): boolean {
		return (this.date.getDate() === day && this.date.getHours() >= hours) || this.date.getDate() > day;
	}
}