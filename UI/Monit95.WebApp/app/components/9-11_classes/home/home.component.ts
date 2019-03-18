import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';

@Component({
	templateUrl: `./app/components/9-11_classes/home/home.component.html?v=${new Date().getTime()}`
})
export class HomeComponent {
	timeIsCome1 = false;
	timeIsCome2 = false;

	constructor(public account: AccountService) { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome1 = (date.getDate() === 16 && date.getHours() >= 8) || date.getDate() > 16;
		this.timeIsCome2 = (date.getDate() === 16 && date.getHours() >= 14) || date.getDate() > 16;
	}
}