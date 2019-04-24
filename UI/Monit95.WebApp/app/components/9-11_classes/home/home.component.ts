import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';

@Component({
	templateUrl: `./app/components/9-11_classes/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent {
	date = new Date();

	constructor(public account: AccountService) { }

	ngOnInit() { }


	setTimer(day: number, hours: number = 12): boolean {
		return (this.date.getDate() === day && this.date.getHours() >= hours) || this.date.getDate() > day;
	}
}