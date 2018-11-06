import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';

@Component({
	templateUrl: `./app/particips/oge/home/home.component.html?v=${new Date().getTime()}`
})
export class OgeHomeComponent {
	timeIsCome = false;

	constructor(public account: AccountService) { }

	ngOnInit() {
		const date = new Date();
		this.timeIsCome = (date.getDate() === 18 && date.getHours() >= 14) || date.getDate() > 18;
	}
}